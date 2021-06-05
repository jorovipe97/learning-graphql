function links(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
}

async function count(parent, args, context) {
  const count = await context.prisma.link.count({ where: { postedById: parent.id } });

  return count;
}

module.exports = {
  links,
  count,
};
