type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  addUser: User
  updateUser: User
  deleteUser?: Maybe<Scalars['ID']>
}

export type MutationAddUserArgs = {
  user?: Maybe<UserInput>
}

export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type Query = {
  getUser?: Maybe<User>
  getUsers?: Maybe<Array<Maybe<User>>>
}

export type QueryGetUserArgs = {
  id?: Maybe<Scalars['ID']>
}

export type User = {
  id: Scalars['ID']
  username?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  profile?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

export type UserInput = {
  id: Scalars['ID']
  username?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  profile?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

import { GraphQLResolveInfo } from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: Query
  ID: Scalars['ID']
  User: User
  String: Scalars['String']
  Mutation: Mutation
  UserInput: UserInput
  Boolean: Scalars['Boolean']
}

export type MutationResolvers<
  Context = any,
  ParentType = ResolversTypes['Mutation']
> = {
  addUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    Context,
    MutationAddUserArgs
  >
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    Context,
    MutationUpdateUserArgs
  >
  deleteUser?: Resolver<
    Maybe<ResolversTypes['ID']>,
    ParentType,
    Context,
    MutationDeleteUserArgs
  >
}

export type QueryResolvers<
  Context = any,
  ParentType = ResolversTypes['Query']
> = {
  getUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    Context,
    QueryGetUserArgs
  >
  getUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    Context
  >
}

export type UserResolvers<
  Context = any,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, Context>
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type Resolvers<Context = any> = {
  Mutation?: MutationResolvers<Context>
  Query?: QueryResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = any> = Resolvers<Context>
