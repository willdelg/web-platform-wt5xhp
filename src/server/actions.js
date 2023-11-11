import HttpError from '@wasp/core/HttpError.js'

export const createAutogpt = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Autogpt.create({
    data: {
      description: args.description,
      isExpired: false,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const expireAutogpt = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const autogpt = await context.entities.Autogpt.findUnique({
    where: { id: args.id }
  });
  if (autogpt.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Autogpt.update({
    where: { id: args.id },
    data: { isExpired: true }
  });
}