import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { registerUser } from "../../redux/auth/auth-slice";

type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const RegisterSchema: ZodType<Inputs> = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(15, { message: "Name is too long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password sould be at least 5 symbols" })
    .max(15, { message: "Password is too long" }),
});

export const Registration = () => {

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(registerUser(data));
    //reset()
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          {...register("fullName")}
          error={!!errors?.fullName?.message}
          helperText={errors?.fullName?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          {...register("email")}
          error={!!errors?.email?.message}
          helperText={errors?.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          {...register("password")}
          error={!!errors?.password?.message}
          helperText={errors?.password?.message}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
