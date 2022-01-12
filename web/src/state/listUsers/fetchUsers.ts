import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";



const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});
const fetchUsers = async (state: string, exp: string, name: string, email: string, limit: number, offset: number) => {
    const USERS = gql`
        {
            users(
                ${(state)&&`state: ${JSON.stringify(state)}`}
                ${(exp)&&`petExp: ${exp}`}
                ${(name)&&`name:${JSON.stringify(name)}`}
                ${(email)&&`email: ${JSON.stringify(email)}`}
                limit: ${limit}
                offset: ${offset}
            ) {
               items{
                uuid,
                firstName,
                lastName,
                email,
                state,
                petExp
               },
               pagination{
                   totalPage
               }
            }

        }
    `;
    const { data } = await client
        .query({
            query: USERS,
            fetchPolicy: 'no-cache',
        })
    console.log(data)
    return data.users
}

export default fetchUsers