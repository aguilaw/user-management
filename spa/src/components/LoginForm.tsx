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

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, token } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      //TODO: dont send raw password
      const { data } = await axios.post(
        //TODO: Configure axios somewhere else so we dont have to hardcode the host everytime. Preferably an API interface so we can just call methods in the components
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      login(data.access_token, data.user);

      navigate("/");
    } catch (error) {
      // TODO: process server errors. For ex. the server IS validating email formatting but the SPA isn't. The server will throw a 400 as expected and this should trigger some kind of feedback so the user know what went wrong.
    }
  };

  return (
    <Paper elevation={1}>
      <Box p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
export default LoginForm;
