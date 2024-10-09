// components/Search.jsx
import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField, Flex } from "@radix-ui/themes/dist/cjs/index.js";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Flex direction="column" align="center" mt="5" gap="3">
      <Box maxWidth="1700px">
        <TextField.Root
          size="3"
          placeholder="procurar..."
          radius="full"
          style={{ width: "40vw", fontSize: "20px", marginTop: "8%" }}
          value={query}
          onChange={handleChange}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="24" width="24" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </Flex>
  );
};

export default Search;
