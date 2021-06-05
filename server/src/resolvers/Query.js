async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

function info(parent, args, context) {
  return 'Hi this is a basic info field.';
}

// First, it’s important to note that every GraphQL resolver function
// actually receives four input arguments. As the remaining three are
// not needed in our scenario right now, we’re simply omitting them.
// Don’t worry, you’ll get to know them soon.
// https://www.howtographql.com/graphql-js/2-a-simple-query/

// See details on resolver arguments:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments

/**
 * 
 * @param {*} parent The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain). For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.
 * @param {*} args An object that contains all GraphQL arguments provided for this field. For example, when executing query{ user(id: "4") }, the args object passed to the user resolver is { "id": "4" }.
 * @param {*} context An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
 * @param {*} info Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.
 */
async function users(parent, args, context, info) {
  const users = await context.prisma.user.findMany();
  return users;
}

module.exports = {
  feed,
  info,
  users
};
