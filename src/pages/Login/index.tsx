import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logIn } from "../../redux/auth/auth-slice";
import { isAuthSelector } from "../../common/selectors";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";


type Inputs = {
  email: string
  password: string
}

const LogInSchema: ZodType<Inputs> = z
.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password is too short" })
    .max(15, { message: "Password is too long" }),
})


export const Login = () => {
  
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(isAuthSelector) 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LogInSchema), 
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(logIn(data))
    reset()
  }

  if(isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        error={!!errors?.email?.message}
        helperText={errors?.email?.message}
        {...register('email')}
        fullWidth
      />
      <TextField className={styles.field} label="Пароль" 
      error={!!errors?.password?.message}
      helperText={errors?.password?.message}
      fullWidth 
      {...register("password")}/>
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
