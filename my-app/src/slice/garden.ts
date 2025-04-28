import api from './api';

type CreateNewGardenLineRequest = {
  parcelId: number;
  length: number;
};

type GetAllLinesByParcelIdRequest = {
  parcelId: number;
};

type GetAllLinesByParcelIdResponse = {
  id: number;
  parcelId: number;
  length: number;
  createdAt: string;
}[];

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

type GetAllParcelByGardenIdRequest = {
  gardenId: number;
};

type GetAllParcelByGardenIdResponse = {
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

export const extendedGardenAPI = api
  .enhanceEndpoints({ addTagTypes: ['garden-lines', 'garden-parcels'] })
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
      //DeleteOneLine >> OK
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
      //EditLine

      //CreateNewParcel
      createNewParcel: builder.mutation<void, CreateNewParcelRequest>({
        query: (arg) => ({
          url: `/garden/parcel/`,
          method: 'POST',
          body: arg,
        }),
        invalidatesTags: ['garden-parcels'],
      }),
      //GetAllParcelByGardenId
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
      //DeleteParcel
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
      //EditParcel

      //CreateNewGarden

      //GetAllGardeByUserId

      //EditGarden
    }),
  });

export const {
  useCreateNewGardenLineMutation,
  useGetAllLinesByParcelIdQuery,
  useDeleteOneLineByLineIdMutation,
  useCreateNewParcelMutation,
  useDeleteOneParcelByParcelIdMutation,
  useGetAllParcelByGardenIdQuery,
} = extendedGardenAPI;
