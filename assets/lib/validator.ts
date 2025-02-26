import { z } from "zod";
import { daysFromNow, parseDDMMYYYY } from "./dateFormatter";

// input string required and min

const inputTextReqLen = ({
  label,
  len = 5,
}: {
  label: string;
  len?: number;
}) => {
  return z
    .string({
      required_error: `${label} is required`,
    })
    .min(len, {
      message: `Must be at least ${len} characters long`,
    });
};

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: inputTextReqLen({
    label: "Password",
    len: 3,
  }),
});

export const RegisterSchema = z.object({
  fullname: inputTextReqLen({
    label: "Full name",
    len: 3,
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: inputTextReqLen({
    label: "Password",
    len: 8,
  }),
});

export const ContentSchema = z.object({
  date: z.preprocess(
    (arg) => {
      // If the input is a string in dd/mm/yyyy format, parse it.
      if (typeof arg === "string") {
        return parseDDMMYYYY(arg, '-');
      }
      return arg;
    },
    z
      .date({
        required_error: "Date is Required",
      })
      .min(daysFromNow(0), {
        message: "must be a day in the future",
      })// Ensure the date is in the future
  ),
  title: inputTextReqLen({
    label: "Title",
  }),
  description: inputTextReqLen({
    label: "Content description",
    len: 10,
  }),
});

// inputTextReqLen({
//     label:"Date",
//     len:3
// })
