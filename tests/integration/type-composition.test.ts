import { describe, expect, test } from "vitest";
import { z } from "zod";
import { Actor } from "../../src/v1_5/objects/actor.js";
import { Analytic } from "../../src/v1_5/objects/analytic.js";
import { File } from "../../src/v1_5/objects/file.js";
import { Process } from "../../src/v1_5/objects/process.js";
import { User } from "../../src/v1_5/objects/user.js";

describe("Type Composition", () => {
  test("schemas support .array() composition", () => {
    // Create an array schema from User
    const UsersArray = z.array(User);

    // Should validate array of users
    const data = [
      { name: "Alice", uid: "u1" },
      { name: "Bob", uid: "u2" },
    ];

    const result = UsersArray.parse(data);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Alice");
  });

  test("schemas support .extend() to add fields", () => {
    // Extend User with additional fields
    const ExtendedUser = User.extend({
      role: z.string(),
      department: z.string().optional(),
    });

    const data = {
      name: "Alice",
      uid: "u1",
      role: "admin",
      department: "Engineering",
    };

    const result = ExtendedUser.parse(data);
    expect(result.name).toBe("Alice");
    expect(result.role).toBe("admin");
    expect(result.department).toBe("Engineering");
  });

  test("recursive schemas work correctly", () => {
    // Analytic has self-reference via related_analytics
    const data = {
      name: "Root Analysis",
      type_id: 1,
      related_analytics: [
        { name: "Child Analysis 1", type_id: 2 },
        {
          name: "Child Analysis 2",
          type_id: 3,
          related_analytics: [{ name: "Grandchild Analysis", type_id: 4 }],
        },
      ],
    };

    const result = Analytic.parse(data);
    expect(result.name).toBe("Root Analysis");
    expect(result.related_analytics).toHaveLength(2);
    expect(result.related_analytics?.[1].related_analytics).toHaveLength(1);
  });

  test("schemas support .pick() to select fields", () => {
    // Pick only specific fields from User
    const UserNameOnly = User.pick({ name: true, uid: true });

    const data = {
      name: "Alice",
      uid: "u1",
    };

    const result = UserNameOnly.parse(data);
    expect(result.name).toBe("Alice");
    expect(result.uid).toBe("u1");
    // Since we didn't pass email_addr, it shouldn't be in result
    expect("email_addr" in result).toBe(false);
  });

  test("schemas support .omit() to exclude fields", () => {
    // Omit specific fields from User
    const UserWithoutEmail = User.omit({ email_addr: true });

    const data = {
      name: "Alice",
      uid: "u1",
      // email_addr omitted - strict mode rejects unrecognized fields
    };

    const result = UserWithoutEmail.parse(data);
    expect(result.name).toBe("Alice");
    expect(result.uid).toBe("u1");
    // email_addr was omitted and not in input, so should be undefined
    expect(result.email_addr).toBeUndefined();
  });

  test("schemas support .merge() to combine schemas", () => {
    // Create two partial schemas and merge them
    const UserBasic = User.pick({ name: true, uid: true });
    const UserContact = User.pick({ email_addr: true });

    const UserMerged = UserBasic.merge(UserContact);

    const data = {
      name: "Alice",
      uid: "u1",
      email_addr: "alice@example.com",
    };

    const result = UserMerged.parse(data);
    expect(result.name).toBe("Alice");
    expect(result.uid).toBe("u1");
    expect(result.email_addr).toBe("alice@example.com");
  });

  test("objects in cycles can reference each other", () => {
    // File and Process are in a cycle
    // File can reference Process via created_process, loaded_modules, etc.
    // Process can reference File via file, loaded_modules, etc.

    const fileData = {
      name: "app.exe",
      path: "/usr/bin/app.exe",
      type_id: 1,
    };

    const processData = {
      name: "app",
      pid: 1234,
      file: {
        name: "app.exe",
        path: "/usr/bin/app.exe",
        type_id: 1,
      },
    };

    // Should parse without errors
    const file = File.parse(fileData);
    const process = Process.parse(processData);

    expect(file.name).toBe("app.exe");
    expect(process.name).toBe("app");
    expect(process.file?.name).toBe("app.exe");
  });

  test("composed types are properly inferred", () => {
    // Test that TypeScript inference works correctly
    const userData = User.parse({ name: "Alice", uid: "u1" });

    // These should be type-safe assignments
    const name: string | undefined = userData.name;
    const uid: string | undefined = userData.uid;

    // TypeScript should allow accessing any property due to passthrough
    const anyProp: unknown = userData.someRandomField;

    expect(name).toBe("Alice");
    expect(uid).toBe("u1");
  });

  test("nested object references work correctly", () => {
    // Actor can contain User
    const actorData = {
      user: {
        name: "Alice",
        uid: "u1",
        email_addr: "alice@example.com",
      },
      process: {
        name: "bash",
        pid: 5678,
      },
    };

    const result = Actor.parse(actorData);
    expect(result.user?.name).toBe("Alice");
    expect(result.process?.name).toBe("bash");
  });

  test("array fields compose correctly", () => {
    // Test that array fields work with composition
    const ExtendedAnalytic = Analytic.extend({
      tags: z.array(z.string()),
    });

    const data = {
      name: "Main Analysis",
      type_id: 1,
      tags: ["important", "security"],
      related_analytics: [
        { name: "Related 1", type_id: 2 },
        { name: "Related 2", type_id: 3 },
      ],
    };

    const result = ExtendedAnalytic.parse(data);
    expect(result.name).toBe("Main Analysis");
    expect(result.tags).toEqual(["important", "security"]);
    expect(result.related_analytics).toHaveLength(2);
  });
});
