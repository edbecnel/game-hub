import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import categories from "../categories";

// const onSubmit = (data: FieldValues) => console.log(data);

// const schema = z.object({
//   description: z
//     .string()
//     .trim()
//     .min(3, { message: "Description must be at least 3 characters." })
//     .max(50, { message: "Description cannot exceed 50 characters." }),
//   amount: z
//     .number({ invalid_type_error: "Amount field is required." })
//     .min(0.01, { message: "Amount must be at least .01" })
//     .max(100000, { message: "Amount cannot exceed 100_000" }),
//   category: z.enum(categories),
// });
const schema = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: "Description should be at least 3 characters." })
    .max(50, { message: "Description cannot exceed 50 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01, { message: "Amount must be at least .01" })
    .max(100_000, { message: "Amount cannot exceed 100_000" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-danger"> {errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-danger"> {errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select id="category" className="form-select" {...register("category")}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger"> {errors.category.message}</p>
        )}
      </div>
      {/* <button disabled={!isValid} className="btn btn-primary" type="submit"> */}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
