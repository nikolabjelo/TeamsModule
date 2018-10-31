import { logger } from '../../../logger'

import TEAMS_CONNECTIONS_FRAGMENT from '../../fragments/TeamsConnectionsFragment'
import TEAMS_FRAGMENT from '../../fragments/TeamsFragment'

export const teams = async (parent, args, ctx, info) => {
  logger.info('teams: ', ctx.request.res)
  return ctx.db.query.teamsConnection({}, TEAMS_CONNECTIONS_FRAGMENT)
}

export const teamById = async (parent, { id }, ctx, info) => {
  return ctx.db.query.team({ where: { id } }, info)
}

export const teamByName = async (parent, { name }, ctx, info) => {
  return ctx.db.query.team({ where: { name: name } }, `{ name }`)
}

export const teamWithRole = async (parent, { teamId, role }, ctx, info) => {
  return ctx.db.query.teamsConnection({where: {AND: [{id: teamId},{members_some:{role: role}}]}, first:1}, info)
}

export const teamsByOwner = async (parent, { ownerId }, ctx, info) => {
  logger.info('teamsByOwner')
  logger.info(ctx.req.headers)
  logger.info(ctx.req.token)
  return ctx.db.query.teams({where: { owner: ownerId }, orderBy:'updatedAt_DESC'}, TEAMS_FRAGMENT)
}

export const teamsByRole = async (parent, args, ctx, info) => {
  const authId = ctx.request.userId
  let teamAdmin
  try {
    teamAdmin= await ctx.db.query.teams({where: {members_some: {AND: [{member: {authId: authId}, role_not:'MEMBER'}]}}}, TEAMS_FRAGMENT)
  } catch (err) {
    logger.debug('teamsByRole error: ')
    logger.debug(err)
    const errors = res.graphQLErrors.map((error) => {
      return error.message
    })
    return errors
  }
  logger.info('teamsByRole teamAdmin: ', teamAdmin)
  return teamAdmin
}