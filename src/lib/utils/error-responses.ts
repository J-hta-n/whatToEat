import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const getValidationErrorResponse = (zodError: ZodError) => {
  let zodErrors = {};
  zodError.errors.forEach((error) => {
    zodErrors = { ...zodErrors, [error.path[0]]: error.message };
  });
  return NextResponse.json({ error: zodErrors }, { status: 400 });
};
