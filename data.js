export const tasks = [
  {
    id: 1,
    parentId: -1,
    title: "Раз",
    start: new Date("2019-02-21T05:00:00.000Z"),
    end: new Date("2019-07-04T12:00:00.000Z"),
    progress: 31
  },
  {
    id: 2,
    parentId: 1,
    title: "Два",
    start: new Date("2019-02-21T05:00:00.000Z"),
    end: new Date("2019-02-26T09:00:00.000Z"),
    progress: 60
  },
  {
    id: 3,
    parentId: 2,
    title: "Три",
    start: new Date("2019-02-21T05:00:00.000Z"),
    end: new Date("2019-02-21T09:00:00.000Z"),
    progress: 100
  },
  {
    id: 4,
    parentId: 2,
    title: "Елочка гори",
    start: new Date("2019-02-21T10:00:00.000Z"),
    end: new Date("2019-02-22T09:00:00.000Z"),
    progress: 100
  }
];
