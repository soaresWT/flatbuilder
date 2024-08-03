import { Card, Flex } from "@radix-ui/themes/dist/cjs/index.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Inset,
  Text,
  Strong,
  Skeleton,
} from "@radix-ui/themes/dist/cjs/index.js";
import { CopyIcon, PlusIcon, CheckIcon } from "@radix-ui/react-icons"; // Importar o ícone de confirmação

import "./Card.css";

const AppCard = ({ app }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [installCommand, setInstallCommand] = useState("");
  const [copyStatus, setCopyStatus] = useState("default"); // novo estado para o botão

  useEffect(() => {
    if (app) {
      setIsLoading(false);
      setInstallCommand(`flatpak install ${app.flatpakAppId}`);
    }
  }, [app]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(installCommand)
      .then(() => {
        setCopyStatus("copied");
        setTimeout(() => {
          setCopyStatus("default");
        }, 2000); // Muda o texto e ícone por 2 segundos
      })
      .catch((error) => console.error("Erro ao copiar o comando:", error));
  };

  return (
    <Box width="400px" height="460px">
      <Card
        size="3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Inset clip="padding-box" side="top" pb="current">
          {!isLoading ? (
            <img
              src={app ? app.iconDesktopUrl : null}
              alt="App icon"
              style={{
                display: "block",
                objectFit: "contain",
                width: "100%",
                height: 100,
                margin: "20px 10px",
                backgroundColor: "transparent",
              }}
            />
          ) : (
            <Skeleton height="140px" />
          )}
        </Inset>
        <Text as="p" size="3" style={{ flexGrow: 1 }}>
          <Strong>{isLoading ? <Skeleton width="40%" /> : app.name}</Strong>
          <br />
          {isLoading ? (
            <>
              <Skeleton width="80%" />
              <Skeleton width="75%" mt="2" />
              <Skeleton width="82%" mt="2" />
            </>
          ) : (
            <span className="summary">{app.summary}</span>
          )}
        </Text>
        {!isLoading && (
          <Text
            size="3"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <code>{installCommand}</code>
          </Text>
        )}
        <Box style={{ display: "flex", gap: "10px" }}>
          <Button size="2">
            <PlusIcon style={{ marginRight: "3px" }} />
            Adicionar
          </Button>
          <Button
            size="2"
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
            variant="outline"
          >
            {copyStatus === "copied" ? (
              <>
                <CheckIcon style={{ marginRight: "3px" }} />
                Copiado
              </>
            ) : (
              <>
                <CopyIcon style={{ marginRight: "3px" }} />
                Copiar comando
              </>
            )}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

AppCard.propTypes = {
  app: PropTypes.shape({
    flatpakAppId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    iconDesktopUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppCard;
