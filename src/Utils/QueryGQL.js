import { gql } from "@apollo/client";

export const QUERY_SIGNUP = gql`
  mutation MyMutation($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

export const QUERY_LOGIN = gql`
  query MyQuery($username: String!, $password: String!) {
    users(
      where: {
        _and: {}
        username: { _eq: $username }
        password: { _eq: $password }
      }
    ) {
      id
    }
  }
`;

export const QUERY_JOIN_ROOM = gql`
  mutation MyMutation($room_id: uuid = String, $user_id: uuid = String) {
    insert_room_users_one(object: { room_id: $room_id, user_id: $user_id }) {
      room_id
      user_id
    }
  }
`;

export const QUERY_CREATE_ROOM = gql`
  mutation MyMutation($description: String!, $name: String!) {
    insert_room_one(object: { description: $description, name: $name }) {
      id
    }
  }
`;

export const QUERY_LIST_ROOM = gql`
  query MyQuery($user_id: uuid = String) {
    room_users(
      order_by: { created_at: desc }
      where: { user_id: { _eq: $user_id } }
    ) {
      user_id
      room {
        name
        id
        description
      }
    }
  }
`;

export const QUERY_SUBCRIPTION_CHAT = gql`
  subscription MySubscription($room_id: uuid = String) {
    chats(where: { room_id: { _eq: $room_id } }) {
      room_id
      user_id
      updated_at
      created_at
      id
      message
      user {
        username
      }
    }
  }
`;

export const QUERY_SUBCRIPTION_ROOM = gql`
  subscription MySubscription($user_id: uuid = String) {
    room_users(
      order_by: { created_at: desc }
      where: { user_id: { _eq: $user_id } }
    ) {
      user_id
      room {
        name
        id
        description
      }
    }
  }
`;
export const QUERY_ROOM_BY_ID = gql`
  query MyQuery($id: uuid = String) {
    room_by_pk(id: $id) {
      description
      id
      name
    }
  }
`;

export const QUERY_SEND_CHAT = gql`
  mutation MyMutation(
    $message: String!
    $room_id: uuid = String
    $user_id: uuid = String
  ) {
    insert_chats_one(
      object: { room_id: $room_id, message: $message, user_id: $user_id }
    ) {
      id
    }
  }
`;

export const QUERY_UPDATE_ROOM = gql`
  mutation MyMutation($id: uuid!, $description: String!, $name: String!) {
    update_room_by_pk(
      pk_columns: { id: $id }
      _set: { description: $description, name: $name }
    ) {
      id
      description
      name
    }
  }
`;
