"use client"
import { useEffect, useState } from "react";
import useSWR from "swr";
import { YStack, H1, Button, Text, Spinner, ListItem, Separator, YGroup } from 'tamagui'


async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function HomePage() {
  return (
    <div>
      <H1>Home Page V1</H1>
      <YStack f={1} ai="center" jc="center">
        <Counter />
        <Profile />
        <H1>Olá Mundo</H1>
        <Button>Tamagui Funciona!</Button>
      </YStack>
    </div>
  );
}

function Profile() {
  const [hasMounted, setHasMounted] = useState(false);
  const { data, error, isLoading } = useSWR("/api/v1/transactions", fetchAPI);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const dateFormat = (stringDate) => {
    if (!stringDate) return "";
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(stringDate));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value)); // Garante que seja tratado como número
  };

  // 3. Renderização condicional de estados
  if (!hasMounted || isLoading) {
    return (
      <YStack ai="center" jc="center" p="$4" gap="$2">
        <Spinner size="large" color="$blue10" />
        <Text>Loading transactions...</Text>
      </YStack>
    );
  }

  if (error) return <Text color="$red10">Error.</Text>;

  const transactions = data?.data || {};
  // Desestruturação para separar metadados do que será listado
  const { transaction_id, created_at, updated_at, ...setData } = transactions;

  return (
    <YStack 
      gap="$4" 
      p="$4" 
      backgroundColor="$background" 
      borderRadius="$4" 
      borderWidth={1} 
      borderColor="$borderColor"
      maxWidth={400}
      alignSelf="center"
    >
      <Text fontSize="$6" fontWeight="bold" textAlign="center">
        Transaction details
      </Text>

      <YGroup bordered size="$4" separator={<Separator />}>
        {Object.entries(setData).map(([key, value]) => {
          let displayedValue = value;

          // Lógica de formatação dinâmica
          if (key.includes("date") || key.includes("_at")) {
            displayedValue = dateFormat(value);
          } else if (key === "value") {
            displayedValue = formatCurrency(value);
          }

          // IMPORTANTE: O return dentro do map é obrigatório para exibir os itens
          return (
            <YGroup.Item key={key}>
              <ListItem
                title={key.replace("_", " ").toUpperCase()}
                subTitle={String(displayedValue)}
                hoverTheme
              />
            </YGroup.Item>
          );
        })}
      </YGroup>

      {/* Exibe o valor total em destaque se ele existir */}
      {transactions.value && (
        <YStack ai="flex-end" px="$4" mt="$2">
          <Text theme="alt1" fontSize="$3">Valor Total:</Text>
          <Text fontSize="$8" color="$green10" fontWeight="bold">
            {formatCurrency(transactions.value)}
          </Text>
        </YStack>
      )}
    </YStack>
  );
}

function Counter() {
  const [counter, setCounter] = useState(1);

  function addCounter() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={addCounter}>Count</button>
    </div>
  )
}
