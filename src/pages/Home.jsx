import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  Input,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setPassword("");
  }, []);

  const handleNameChange = (e) => {
    console.log(name);
    setName(e.target.value);
  };

  const handlePassChange = (e) => {
    console.log(password);
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (name && password) {
      navigate(`/room?roomId=${password}`);
    } else {
      console.log("名前とパスの入力");
    }
  };

  return (
    <>
      <Box>
        <Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ mt: "20%" }}
          >
            {/* 名前入力 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "8vw",
              }}
            >
              名前
            </Typography>
            <FormControl required color="primary" sx={{ width: "60%" }}>
              <Input
                placeholder="名前を入力"
                name="Name"
                autoComplete="off"
                fullWidth
                disableUnderline
                onChange={handleNameChange}
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "3px solid white",
                  backgroundColor: "white",
                }}
              />
            </FormControl>

            {/* 合言葉入力 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "8vw",
              }}
            >
              合言葉
            </Typography>
            <FormControl required color="primary" sx={{ width: "60%" }}>
              <Input
                placeholder="合言葉を入力"
                name="Password"
                autoComplete="off"
                fullWidth
                disableUnderline
                onChange={handlePassChange}
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "3px solid white",
                  backgroundColor: "white",
                }}
              />
            </FormControl>
          </Stack>
          <Box>
            <Box
              sx={{
                mt: 5,
                position: "relative",
              }}
            ></Box>
          </Box>

          <Button
            onClick={handleSubmit}
            sx={{
              fontSize: "8vw",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ffdbdb",
              marginTop: "10%",
              border: "10px solid white",
              borderRadius: "15px",
              padding: "2px 30px 2px 30px",
            }}
          >
            タップ
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
