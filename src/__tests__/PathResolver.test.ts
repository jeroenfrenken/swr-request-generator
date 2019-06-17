import { PathResolver } from "../PathResolver";
import swagger from "./mock-data/swagger.json";
import { getTypeNames } from "../utils";

describe("PathResolver", () => {
  it("should get resolved paths by swagger schema", () => {
    expect(
      PathResolver.of((swagger as any).paths, swagger.basePath, getTypeNames((swagger as any).definitions)).resolve()
        .resolvedPaths,
    ).toEqual(expectedPathResolvedData);
  });

  it("should get correct action creator by resolved paths", () => {
    expect(
      PathResolver.of((swagger as any).paths, swagger.basePath, getTypeNames((swagger as any).definitions))
        .resolve()
        .toRequest(),
    ).toEqual(expectedRequest);
  });
});

const expectedPathResolvedData = [
  {
    TReq: { attachment: "File" },
    TResp: "IAttachmentBo",
    bodyParams: [],
    extraDefinitions: {},
    formDataParams: ["attachment"],
    operationId: "uploadAttachmentUsingPOST",
    pathParams: [],
    queryParams: [],
    url: "/api/test",
    method: "post",
  },
  {
    TReq: { id: "string" },
    TResp: "IResource",
    bodyParams: [],
    extraDefinitions: {},
    formDataParams: [],
    operationId: "downloadUsingGET",
    pathParams: ["id"],
    queryParams: [],
    url: "/api/test/${id}",
    method: "get",
  },
  {
    TReq: { id: "string" },
    TResp: "",
    bodyParams: [],
    extraDefinitions: {},
    formDataParams: [],
    operationId: "deleteAttachmentUsingDELETE",
    pathParams: ["id"],
    queryParams: [],
    url: "/api/test/${id}",
    method: "delete",
  },
  {
    TReq: { id: "string" },
    TResp: "IBookDetailVo",
    bodyParams: [],
    extraDefinitions: {},
    formDataParams: [],
    operationId: "findBookByIdUsingGET",
    pathParams: ["id"],
    queryParams: [],
    url: "/api/test/book/${id}",
    method: "get",
  },
  {
    TReq: { id: "string", updateBookRequest: "IUpdateBookRequest" },
    TResp: "",
    bodyParams: ["updateBookRequest"],
    extraDefinitions: {},
    formDataParams: [],
    operationId: "updateBookByIdUsingPUT",
    pathParams: ["id"],
    queryParams: [],
    url: "/api/test/book/${id}",
    method: "put",
  },
  {
    TReq: { scheduleDate: "number", "roleId?": "string" },
    TResp: "IScheduleVo[]",
    bodyParams: [],
    extraDefinitions: {},
    formDataParams: [],
    operationId: "getScheduleDetailsByDateUsingGET",
    pathParams: [],
    queryParams: ["scheduleDate", "roleId"],
    url: "/api/test/schedules",
    method: "get",
  },
  {
    TReq: { "from?": "keyof typeof FromFrom#EnumTypeSuffix", documentId: "string" },
    TResp: "IDocumentVo",
    bodyParams: [],
    extraDefinitions: {
      "FromFrom#EnumTypeSuffix": ["AAA", "BBB"],
    },
    formDataParams: [],
    operationId: "getDocumentByIdUsingGET",
    pathParams: ["documentId"],
    queryParams: ["from"],
    url: "/api/test/documents/${documentId}/doc",
    method: "get",
  },
];

const expectedRequest = [
  "export const uploadAttachmentUsingPOST = createRequestAction<{\n   " +
    "     'attachment': File;\n      }, " +
    "IAttachmentBo>('uploadAttachmentUsingPOST', ({\n    attachment\n    " +
    "}) => ({url: `/api/test`,data: attachment,headers: " +
    "{'Content-Type': 'multipart/form-data'}}));",
  "export const downloadUsingGET = createRequestAction<{\n  " +
    "      'id': string;\n      }, " +
    "IResource>('downloadUsingGET', ({\n    id\n    }) => " +
    "({url: `/api/test/${id}`,}));",
  "export const deleteAttachmentUsingDELETE = " +
    "createRequestAction<{\n        'id': string;\n      }, " +
    ">('deleteAttachmentUsingDELETE', ({\n    id\n    }) => ({url: " +
    "`/api/test/${id}`,}));",
  "export const findBookByIdUsingGET = createRequestAction<{\n    " +
    "    'id': string;\n      }, " +
    "IBookDetailVo>('findBookByIdUsingGET', ({\n    id\n    }) => " +
    "({url: `/api/test/book/${id}`,}));",
  "export const updateBookByIdUsingPUT = createRequestAction<{\n  " +
    "      'id': string;\n'updateBookRequest': IUpdateBookRequest;\n  " +
    "    }, >('updateBookByIdUsingPUT', ({\n    id,\n" +
    "updateBookRequest\n    }) => ({url: " +
    "`/api/test/book/${id}`,data: updateBookRequest,headers: " +
    "{'Content-Type': 'application/json'}}));",
  "export const getScheduleDetailsByDateUsingGET = createRequestAction<{\n    " +
    "    'scheduleDate': number;\n'roleId'?: string;\n      }, " +
    "IScheduleVo[]>('getScheduleDetailsByDateUsingGET', ({\n    scheduleDate,\n" +
    "roleId\n    }) => ({url: `/api/test/schedules`,params: {\n    scheduleDate,\n" +
    "roleId\n    },}));",
  "export const getDocumentByIdUsingGET = createRequestAction<{\n    " +
    "    'documentId': string;\n'from'?: keyof typeof FromFrom;\n      }, " +
    "IDocumentVo>('getDocumentByIdUsingGET', ({\n    documentId,\nfrom\n    " +
    "}) => ({url: `/api/test/documents/${documentId}/doc`,params: {\n  " +
    '  from\n    },}));export enum FromFrom {"AAA"="AAA","BBB"="BBB"}',
];