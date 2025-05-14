import { Garden, GardenFull } from '@/utils/types';
import api from './api';
import { Log } from '@/utils/types';

// type LoginUserRequest = {
//   email: string;
//   password: string;
// };

// type LoginUserResponse = {
//   isEmpty: string;
//   message: string;
//   token: string;
//   content: {
//     id: number;
//     username: string;
//   };
// };

type CreateNewGardenLineRequest = {
  parcelId: number;
  length: number;
};

type GetAllLinesByParcelIdRequest = {
  parcelId: number;
};

type GetAllLinesByParcelIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    parcelId: number;
    length: number;
    createdAt: string;
  }[];
};

type DeleteOneLineByLineIdRequest = {
  lineId: number;
};

type DeleteOneParcelByParcelIdRequest = {
  parcelId: number;
};

type CreateNewParcelRequest = {
  gardenId: number;
  length: number;
  width: number;
  x_position: number;
  y_position: number;
  parcel_angle: number;
};

type EditParcelRequest = {
  parcelId: number;
  length?: number;
  width?: number;
  x_position?: number;
  y_position?: number;
  parcel_angle?: number;
};

type CreateNewGardenRequest = {
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
  hashtags: string[];
};

type GetGardensByNameRequest = {
  inputuser: string;
};

type GetGardensByNameErrorResponse = {
  isEmpty: boolean;
  message: string;
  status?: number;
};

type GetGardensByNameSuccessResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    authorId: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    length: number;
    width: number;
    privacy: number;
    type: number;
    hashtags: [];
  }[];
};

type GetAllParcelByGardenIdRequest = {
  gardenId: number;
};

type GetAllParcelByGardenIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    gardenId: number;
    length: number;
    width: number;
    nLine: number;
    parcelAngle: number;
    createdAt: string;
    lines: [];
    logs: [];
  }[];
};

type GetAllGardenByUserIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    authorId: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    length: number;
    width: number;
    privacy: number;
    type: number;
    hashtags: [];
  }[];
};

type GetAllGardenByUserIdRequest = {
  userId: number;
};

type GetOneGardenByGardenIdResponse = {
  id: number;
  authorId: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  privacy: number;
  type: number;
  hashtags: [];
};

type GetOneGardenByGardenIdRequest = {
  gardenId: number;
};

type CreateCropToLineRequest = {
  lineId: number;
  vegetable: string;
  variety: string;
  icon: string;
  sowing: string;
  planting: string;
  harvesting: string;
  distancePlantation: number;
  comments: string;
};

type CreateCropToNurseryRequest = {
  nurseryId: number;
  vegetable: string;
  variety: string;
  description: string;
  icon: string;
  npot: number;
  potsize: number;
  sowing: string;
  planting: string;
  harvesting: string;
  distance_plantation: number;
};

type PatchCropRequest = {
  cropId?: number;
  lineId?: number;
  plantNurseryId?: number;
};

type GetCropByLineIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    vegetable: string;
    variety: string;
    icon: string;
    sowing: string;
    planting: string;
    harvesting: string;
    distance_plantation: number;
    comments: string;
  }[];
};

type GetCropByLineIdRequest = {
  lineId: number;
};

type GetCropByNurseryIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    vegetable: string;
    variety: string;
    sowing: string;
    icon: string;
    planting: string;
    harvesting: string;
    nPot: number;
    potSize: number;
    distance_plantation: number;
    comments: string;
  }[];
};

type GetCropByNurseryIdRequest = {
  nurseryId: number;
};

type CreateNurseryRequest = {
  gardenId?: number;
  name: string;
  type: string;
};

type GetNurseryByGardenIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    name: string;
    comments: string;
    type: string;
  }[];
};

type GetNurseryByGardenIdRequest = {
  gardenId: number;
};

type DeleteOneNurseryByNurseryIdRequest = {
  nurseryId: number;
};

type RegisterUserRequest = {
  username: string;
  password: string;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;
  birthday: string;
  newsletter: boolean;
  skill_level?: number;
};

type RegisterUserResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    username: string;
  };
};

type CreateTagsListByUserRequest = {
  userId: number;
  hashtags: string[];
};

type GetTagsByUserIdRequest = {
  userId: number;
};

type GetTagsByUserIdResponse = {
  isEmpty: boolean;
  message: string;
  content: string[];
};

type DeleteTagByUserRequest = {
  hashtag: string;
};

type GetAllUsersByTagRequest = {
  hashtags: string[];
};

type GetAllUsersByTagErrorResponse = {
  isEmpty: boolean;
  message: string;
  status?: number;
};

type GetAllUsersByTagSuccessResponse = {
  isEmpty: boolean;
  message: string;
  content?: {
    id: number;
    username: string;
    xp: number;
    country: string;
    bio: string;
    skill_level?: number;
    matchingTagsCount?: number;
    tagsInterests?: {
      id: number;
      userId: number;
      hashtag: string;
      created_at: Date;
    }[];
  }[];
};

type GetAllGardensByTagRequest = {
  hashtags: string[];
};

type GetAllGardensByTagResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    name: string;
    description: string;
    type: number;
    privacy: number;
    tagsInterests: {
      id: number;
      userId: number;
      gardenId: number;
      hashtag: string;
      created_at: Date;
    }[];
  }[];
};

type GetPopularTagsResponse = {
  isEmpty: boolean;
  message: string;
  content: [{ tag: string; count: number }];
};

type GetUserByIdResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    username: string;
    password: string;
    salt: string;
    isAdmin: boolean;
    firstname: string;
    lastname: string;
    email: string;
    bio: string;
    country: string;
    gender: string;
    birthday: string;
    skill_level: number;
    xp: number;
    newsletter: boolean;
    tou: boolean;
    deleted: boolean;
    createdAt: string;
    contributors: string[];
    followerUsers: string[];
    gardens: Garden[];
    logs: string[];
    tagsInterests: string[];
  };
};

type GetUserByUsernameRequest = {
  username: string;
};

type GetUserByUsernameErrorResponse = {
  // value: any;
  isEmpty: boolean;
  message: string;
  status?: number;
};

type GetUserByUsernameSuccessResponse = {
  // value: any;
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    username: string;
    xp: number;
    country: string;
    bio: string;
    tagsInterests: {
      id: number;
      userId: number;
      hashtag: string;
      created_at: Date;
    }[];
  }[];
};

type editUserByUserIdRequest = {
  userId: number;
  username?: string;
  password?: string;
  isAdmin?: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  bio?: string;
  country?: string;
  gender?: string;
  birthday?: string;
  skill_level?: number;
  xp?: number;
  newsletter?: boolean;
  deleted?: boolean;
};

type GetUserByIdRequest = {
  userId: number;
};

type GetAllLogsResponse = {
  isEmpty: boolean;
  message: string;
  content: Log[];
};

type GetAllLogsRequest = {
  id?: number;
};

type GetGardenFullByIdResponse = GardenFull;

type GetGardenFullByIdRequest = {
  id: number;
};

type createLogRequest = {
  id: number;
  gardenId?: number;
  parcelId?: number;
  nurseryId?: number;
  greenhouseId?: number;
  lineId?: number;
  cropId?: number;
  action: string;
  comment: string;
};

export const extendedGardenAPI = api
  .enhanceEndpoints({
    addTagTypes: [
      'garden-lines',
      'garden-parcels',
      'garden-gardens',
      'garden-crops',
      'garden-nursery',
      'connection-login',
      'tags-user',
      'tags-userInterest',
      'tags-logs',
    ],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      //CreateNewGardenLine >> OK
      createNewGardenLine: builder.mutation<void, CreateNewGardenLineRequest>({
        query: (arg) => ({
          url: `/garden/parcel/line/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-lines', 'tags-logs'],
      }),

      //GelAllLineByParcelId >> OK
      getAllLinesByParcelId: builder.query<
        GetAllLinesByParcelIdResponse,
        GetAllLinesByParcelIdRequest
      >({
        query: (arg) => ({
          url: `/garden/parcel/line/${arg.parcelId}`,
          method: 'GET',
        }),
        providesTags: ['garden-lines'],
      }),

      //DeleteOneLine >> OK >>>>>> BUG WHEN DELETING LINE WITH CROPS
      DeleteOneLineByLineId: builder.mutation<
        void,
        DeleteOneLineByLineIdRequest
      >({
        query: (arg) => ({
          url: `/garden/parcel/line/${arg.lineId}`,
          method: 'DELETE',
          body: arg,
        }),
        invalidatesTags: ['garden-lines', 'tags-logs'],
      }),

      //EditLine >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //CreateNewParcel >> OK
      createNewParcel: builder.mutation<void, CreateNewParcelRequest>({
        query: (arg) => ({
          url: `/garden/parcel/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels', 'tags-logs'],
      }),

      //GetAllParcelByGardenId >> OK
      getAllParcelByGardenId: builder.query<
        GetAllParcelByGardenIdResponse,
        GetAllParcelByGardenIdRequest
      >({
        query: (arg) => ({
          url: `/garden/parcel/${arg.gardenId}`,
          method: 'GET',
        }),
        providesTags: ['garden-parcels'],
      }),

      //GetGardensByName
      GetGardensByName: builder.query<
        GetGardensByNameSuccessResponse,
        GetGardensByNameRequest
      >({
        query: (arg) => ({
          url: `/garden/search?inputuser=${arg.inputuser}`,
          method: 'GET',
        }),
        transformErrorResponse: (response: {
          status: number;
          data?: GetGardensByNameErrorResponse;
        }) => {
          return {
            isEmpty: response.data?.isEmpty ?? true,
            message:
              response.data?.message || 'Error fetching user by username',
            status: response.status,
          };
        },
      }),

      //DeleteParcel >> OK
      DeleteOneParcelByParcelId: builder.mutation<
        void,
        DeleteOneParcelByParcelIdRequest
      >({
        query: (arg) => ({
          url: `/garden/parcel/${arg.parcelId}`,
          method: 'DELETE',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels', 'tags-logs'],
      }),

      //EditParcel >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      editParcel: builder.mutation<void, EditParcelRequest>({
        query: (arg) => ({
          url: `/garden/parcel/${arg.parcelId}`,
          method: 'PATCH',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels', 'tags-logs'],
      }),

      //CreateNewGarden >> OK
      createNewGarden: builder.mutation<void, CreateNewGardenRequest>({
        query: (arg) => ({
          url: `/garden/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-gardens', 'tags-logs'],
      }),

      //GetAllGardeByUserId >> OK
      getAllGardenByUserId: builder.query<
        GetAllGardenByUserIdResponse,
        GetAllGardenByUserIdRequest
      >({
        query: (arg) => ({
          url: `/garden/user/${arg.userId}`,
          method: 'GET',
        }),
        providesTags: ['garden-gardens'],
      }),

      //GetOneGardenByGardenId >> OK + TO IMPLEMENT
      getOneGardenByGardenId: builder.query<
        GetOneGardenByGardenIdResponse,
        GetOneGardenByGardenIdRequest
      >({
        query: (arg) => ({
          url: `/${arg.gardenId}`,
          method: 'GET',
        }),
        providesTags: ['garden-gardens'],
      }),

      //EditGarden >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //CreateCropToLine >> OK
      createCropToLine: builder.mutation<void, CreateCropToLineRequest>({
        query: (arg) => ({
          url: `/crops/line/${arg.lineId}`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-crops', 'tags-logs'],
      }),

      //CreateCropToNursery >> OK + TO IMPLEMENT
      createCropToNursery: builder.mutation<void, CreateCropToNurseryRequest>({
        query: (arg) => ({
          url: `/crops/plantnursery/${arg.nurseryId}`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-crops', 'tags-logs'],
      }),

      //PatchCrop >>
      patchCrop: builder.mutation<void, PatchCropRequest>({
        query: (arg) => ({
          url: `/crops/${arg.cropId}`,
          method: 'PATCH',
          body: arg,
        }),
        invalidatesTags: ['garden-crops', 'tags-logs'],
      }),

      //EditCropByCropId >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //GetCropByLineId >> OK
      getCropByLineId: builder.query<
        GetCropByLineIdResponse,
        GetCropByLineIdRequest
      >({
        query: (arg) => ({
          url: `/crops/line/${arg.lineId}`,
          method: 'GET',
        }),
        providesTags: ['garden-crops'],
      }),

      //GetCropByNurseryId >> OK + TO IMPLEMENT
      getCropByNurseryId: builder.query<
        GetCropByNurseryIdResponse,
        GetCropByNurseryIdRequest
      >({
        query: (arg) => ({
          url: `/crops/plantnursery/${arg.nurseryId}`,
          method: 'GET',
        }),
        providesTags: ['garden-crops'],
      }),

      //GetCropsByVegetableName >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<

      //CreateNursery >> OK + TO IMPLEMENT
      createNursery: builder.mutation<void, CreateNurseryRequest>({
        query: (arg) => ({
          url: `/plantnursery`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-nursery', 'tags-logs'],
      }),

      //GetNurseryByGardenId >> OK
      getNurseryByGardenId: builder.query<
        GetNurseryByGardenIdResponse,
        GetNurseryByGardenIdRequest
      >({
        query: (arg) => ({
          url: `/plantnursery/garden/${arg.gardenId}`,
          method: 'GET',
        }),
        providesTags: ['garden-nursery'],
      }),

      //EditNursery >> TO DO

      //DeleteNursery >> OK + TO IMPLEMENT
      DeleteOneNurseryByNurseryId: builder.mutation<
        void,
        DeleteOneNurseryByNurseryIdRequest
      >({
        query: (arg) => ({
          url: `/plantnursery/${arg.nurseryId}`,
          method: 'DELETE',
          body: arg,
        }),
        invalidatesTags: ['garden-nursery', 'tags-logs'],
      }),

      // USER CONNECTION
      // loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      //   query: (arg) => ({
      //     url: `/login`,
      //     method: 'POST',
      //     body: arg,
      //   }),
      // }),

      registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>(
        {
          query: (arg) => ({
            url: `/user`,
            method: 'POST',
            body: arg,
          }),
        }
      ),

      //CreateTagsListByUser >>
      createTagsListByUser: builder.mutation<void, CreateTagsListByUserRequest>(
        {
          query: (arg) => ({
            url: `/tags/list/user/${arg.userId}`,
            method: 'POST',
            body: arg,
          }),
          invalidatesTags: ['tags-user'],
        }
      ),

      //GetTagsByUser >>
      getTagsByUser: builder.query<
        GetTagsByUserIdResponse,
        GetTagsByUserIdRequest
      >({
        query: (arg) => ({
          url: `/tags/user/${arg.userId}`,
          method: 'GET',
        }),
        providesTags: ['tags-userInterest'],
      }),

      //deleteTagByUser >>
      deleteTagByUser: builder.mutation<void, DeleteTagByUserRequest>({
        query: (arg) => ({
          url: `/tags/user/${arg.hashtag}`,
          method: 'DELETE',
          body: arg,
        }),
        invalidatesTags: ['tags-user'],
      }),

      //getAllUsersByTag >>
      getAllUsersByTag: builder.query<
        GetAllUsersByTagSuccessResponse, // Type de succès
        GetAllUsersByTagRequest
      >({
        query: (arg) => ({
          url: `/tags/allusers`,
          method: 'POST',
          body: arg,
        }),
        transformErrorResponse: (response: {
          status: number;
          data?: GetAllUsersByTagErrorResponse;
        }) => {
          return {
            isEmpty: response.data?.isEmpty ?? true,
            message: response.data?.message || 'Error fetching users by tag',
            status: response.status,
          };
        },
      }),

      //getAllGardensByTag >>
      getAllGardensByTag: builder.query<
        GetAllGardensByTagResponse,
        GetAllGardensByTagRequest
      >({
        query: (arg) => ({
          url: `/tags/allgardens`,
          method: 'POST',
          body: arg,
        }),
      }),

      //getPopularTags >>
      getPopularTags: builder.query<GetPopularTagsResponse, void>({
        query: () => ({
          url: `/tags/popular`,
          method: 'GET',
        }),
      }),

      //GetUserById
      getUserById: builder.query<GetUserByIdResponse, GetUserByIdRequest>({
        query: (arg) => ({
          url: `/user/${arg.userId}`,
          method: 'GET',
        }),
        providesTags: ['tags-user'],
      }),

      //EditUserByUserId
      editUserByUserId: builder.mutation<void, editUserByUserIdRequest>({
        query: (arg) => ({
          url: `user/${arg.userId}`,
          method: 'PATCH',
          body: arg,
        }),
      }),

      //GetUserByUsername
      getUserByUsername: builder.query<
        GetUserByUsernameSuccessResponse,
        GetUserByUsernameRequest
      >({
        query: (arg) => ({
          url: `user/search?inputuser=${arg.username}`,
          method: 'GET',
        }),
        transformErrorResponse: (response: {
          status: number;
          data?: GetUserByUsernameErrorResponse;
        }) => {
          return {
            isEmpty: response.data?.isEmpty ?? true,
            message:
              response.data?.message || 'Error fetching user by username',
            status: response.status,
          };
        },
      }),

      // logs
      //GetAllLogsByGardenId
      getAllLogsByGardenId: builder.query<
        GetAllLogsResponse,
        GetAllLogsRequest
      >({
        query: (arg) => ({
          url: `/log/garden/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //GetAllLosByParcelId
      getAllLogsByParcelId: builder.query<
        GetAllLogsResponse,
        GetAllLogsRequest
      >({
        query: (arg) => ({
          url: `/log/parcel/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //GetAllLogsByLineId
      getAllLogsByLineId: builder.query<GetAllLogsResponse, GetAllLogsRequest>({
        query: (arg) => ({
          url: `/log/line/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //GetAllLogByCropId
      getAllLogsByCropId: builder.query<GetAllLogsResponse, GetAllLogsRequest>({
        query: (arg) => ({
          url: `/log/crop/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //GetAllLogsByNurseryId
      getAllLogsByNurseryId: builder.query<
        GetAllLogsResponse,
        GetAllLogsRequest
      >({
        query: (arg) => ({
          url: `/log/nursery/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //GetAllLogsByGreenhouseId
      getAllLogsByGreenhouseId: builder.query<
        GetAllLogsResponse,
        GetAllLogsRequest
      >({
        query: (arg) => ({
          url: `/log/greenhouse/${arg.id}`,
          method: 'GET',
        }),
        providesTags: ['tags-logs'],
      }),
      //CreateLog
      createLog: builder.mutation<void, createLogRequest>({
        query: (arg) => ({
          url: `/log/user/${arg.id}`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['tags-logs'],
      }),

      //GetGardenFullById
      getGardenFullById: builder.query<
        GetGardenFullByIdResponse,
        GetGardenFullByIdRequest
      >({
        query: (arg) => ({
          url: `/garden/${arg.id}`,
          method: 'GET',
        }),
        providesTags: [
          'garden-gardens',
          'garden-parcels',
          'garden-lines',
          'garden-nursery',
          'garden-crops',
        ],
      }),
    }),
    overrideExisting: true,
  });

export const {
  useCreateNewGardenLineMutation,
  useGetAllLinesByParcelIdQuery,
  useDeleteOneLineByLineIdMutation,
  useCreateNewParcelMutation,
  useDeleteOneParcelByParcelIdMutation,
  useGetAllParcelByGardenIdQuery,
  useCreateNewGardenMutation,
  useGetAllGardenByUserIdQuery,
  useGetOneGardenByGardenIdQuery,
  useCreateCropToLineMutation,
  useCreateCropToNurseryMutation,
  useGetCropByLineIdQuery,
  useGetCropByNurseryIdQuery,
  useCreateNurseryMutation,
  useGetNurseryByGardenIdQuery,
  useDeleteOneNurseryByNurseryIdMutation,
  useEditParcelMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useCreateTagsListByUserMutation,
  useGetUserByIdQuery,
  useEditUserByUserIdMutation,
  useGetTagsByUserQuery,
  usePatchCropMutation,
  useDeleteTagByUserMutation,
  useGetAllLogsByCropIdQuery,
  useGetAllLogsByGardenIdQuery,
  useGetAllLogsByGreenhouseIdQuery,
  useGetAllLogsByLineIdQuery,
  useGetAllLogsByNurseryIdQuery,
  useGetAllLogsByParcelIdQuery,
  useGetPopularTagsQuery,
  useCreateLogMutation,
  useLazyGetAllGardensByTagQuery,
  useLazyGetAllUsersByTagQuery,
  useLazyGetGardenFullByIdQuery,
  useLazyGetGardensByNameQuery,
  useLazyGetUserByUsernameQuery,
} = extendedGardenAPI;
