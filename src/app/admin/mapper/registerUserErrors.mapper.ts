

interface RegisterErrors {
  [key: string]: string[]
}

export const registerUserErrorsMapper = (errors: RegisterErrors): string[] => {
  const messagesInArray = Object.values(errors)
    .flatMap((value) => value);

  return messagesInArray;
}