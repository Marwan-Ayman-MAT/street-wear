"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export async function registerCustomer(formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { ok: false, message: "Please provide a valid name, email, and password." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash
    }
  });

  return { ok: true, message: "Account created. You can now sign in." };
}

export async function requestPasswordReset(formData: FormData) {
  const email = z.string().email().safeParse(formData.get("email"));
  if (!email.success) {
    return { ok: false, message: "Enter a valid account email." };
  }

  return {
    ok: true,
    message:
      "A password reset email will be sent if this address belongs to a STREET WEAR account."
  };
}
