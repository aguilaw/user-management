import { Box, Button, Paper, TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useAuth } from "../context";
import { useNavigate } from "react-router";
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      //TODO: dont send raw password
      const { data } = await axios.post(
        //TODO: Configure axios somewhere else so we dont have to hardcode the host everytime
        //TODO: use the register endpoint instead of create.
        "http://localhost:3000/users",
        formData
      );
      console.log(data);

      login(data);

      navigate("/");
    } catch (error) {}
  };

  return (
    <Paper elevation={1}>
      <Box p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <TextField
                  label="First Name"
                  fullWidth
                  {...field}
                  {...(errors.firstName
                    ? { error: true, helperText: errors.firstName.message }
                    : {})}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <div>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    fullWidth
                    {...field}
                    {...(errors.lastName
                      ? { error: true, helperText: errors.lastName.message }
                      : {})}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  //TODO: validate email format. Preferably without hardcoding regex
                }}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    {...field}
                    {...(errors.email
                      ? { error: true, helperText: errors.email.message }
                      : {})}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...field}
                    {...(errors.password
                      ? { error: true, helperText: errors.password.message }
                      : {})}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid size={12} sx={{ alignContent: "center" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default RegisterForm;
