import api from './api';

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
  skill_level: number;
};

type CreateTagsListByUserRequest = {
  userId: number;
  hashtags: string[];
};

export const extendedGardenAPI = api
  .enhanceEndpoints({
    addTagTypes: [
      'garden-lines',
      'garden-parcels',
      'garden-gardens',
      'garden-crops',
      'garden-nursery',
      'connection - login',
      'tags-user',
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
        invalidatesTags: ['garden-lines'],
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
        invalidatesTags: ['garden-lines'],
      }),

      //EditLine >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //CreateNewParcel >> OK
      createNewParcel: builder.mutation<void, CreateNewParcelRequest>({
        query: (arg) => ({
          url: `/garden/parcel/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels'],
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
        invalidatesTags: ['garden-parcels'],
      }),

      //EditParcel >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      editParcel: builder.mutation<void, EditParcelRequest>({
        query: (arg) => ({
          url: `/garden/parcel/${arg.parcelId}`,
          method: 'PATCH',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels'],
      }),

      //CreateNewGarden >> OK
      createNewGarden: builder.mutation<void, CreateNewGardenRequest>({
        query: (arg) => ({
          url: `/garden/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-gardens'],
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

      //GetAllGardenByTags >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //EditGarden >> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //CreateCropToLine >> OK
      createCropToLine: builder.mutation<void, CreateCropToLineRequest>({
        query: (arg) => ({
          url: `/crops/line/${arg.lineId}`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-crops'],
      }),

      //CreateCropToNursery >> OK + TO IMPLEMENT
      createCropToNursery: builder.mutation<void, CreateCropToNurseryRequest>({
        query: (arg) => ({
          url: `/crops/plantnursery/${arg.nurseryId}`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-crops'],
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
        invalidatesTags: ['garden-nursery'],
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
        invalidatesTags: ['garden-nursery'],
      }),

      // // USER CONNECTION
      // loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      //   query: (arg) => ({
      //     url: `/login`,
      //     method: 'POST',
      //     body: arg,
      //   }),
      // }),
      registerUser: builder.mutation<void, RegisterUserRequest>({
        query: (arg) => ({
          url: `/user`,
          method: 'POST',
          body: arg,
        }),
      }),

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
    }),
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
} = extendedGardenAPI;
