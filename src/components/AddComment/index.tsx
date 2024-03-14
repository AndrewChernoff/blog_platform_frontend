import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { createComment } from "../../redux/comments/comments-slice";

type PropsType = {
  id: string
}

type TextFieldType = {
  comment: string
};

const AddCommnetSchema: ZodType<TextFieldType> = z.object({
  comment: z
    .string()
    .min(3, { message: "Message is too short" })
    .max(55, { message: "Message is too long" }),
});

export const Index = ({id}: PropsType) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TextFieldType>({
    resolver: zodResolver(AddCommnetSchema),
  });

  const onSubmit: SubmitHandler<TextFieldType> = (data) => {
    const { comment } = data
    console.log(comment);
    
    dispatch(createComment({id, text: comment}));
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            {...register("comment")}
          />
          <Button type='submit' variant="contained">Отправить</Button>
        </div>
      </div>
    </form>
  );
};
