import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connectionParams = (
    connectionName: any,
    defaultOptionsConnection: any,
  ): any => {
    const result = Object.assign(defaultOptionsConnection, {
      connectionName,
      database:
        process.env.NODE_ENV === 'test'
          ? 'user_test'
          : defaultOptionsConnection.database,
    });
    console.log('DataBase connected');

    return result;
  };
  const connection = await createConnection(
    connectionParams(name, defaultOptions),
  );

  return connection;
};
