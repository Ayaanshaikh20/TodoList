"use client";
import ProtectedRoute from "@/shared/ProtectedRoute";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useState, useMemo, useEffect, memo, useContext } from "react";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  RowDragModule,
  TextFilterModule,
  ValidationModule,
  ColumnAutoSizeModule,
  TextEditorModule,
  RowStyleModule,
} from "ag-grid-community";
import { Toaster, toast } from "react-hot-toast";
import "ag-grid-community/styles/ag-theme-alpine.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { ContextProvider, OverAllContext } from "../../shared/ContextProvider";
import moment from "moment";

ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  RowDragModule,
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule,
  TextEditorModule,
  RowStyleModule,
]);

const Page = () => {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const { user } = useContext(OverAllContext);

  const [taskDetails, setTaskDetails] = useState({
    taskTitle: "",
    taskDescription: "",
    startDate: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    getTasksList();
  }, [user]);

  const handleAddTaskModalOpen = () => {
    setOpenAddTaskModal(!openAddTaskModal);
    if (!openAddTaskModal) {
      setTaskDetails((prev) => {
        return {
          ...prev,
          taskTitle: "",
          taskDescription: "",
          startDate: "",
          dueDate: "",
          priority: "",
          status: "",
        };
      });
    }
  };

  const handleOpenActionMenu = () => {
    setOpenActionMenu(!openActionMenu);
  };

  const handleAddTaskInput = (event, field) => {
    setTaskDetails((prev) => {
      return {
        ...prev,
        [field]:
          field == "priority" || field == "status" ? event : event.target.value,
      };
    });
  };

  const getTasksList = async () => {
    try {
      if (user?.userId) {
        const result = await axios.get(`/api/get-tasks?userId=${user.userId}`);
        const { status, message } = result.data;
        const { tasklist } = result.data.data;
        if (status == 200 && message == "Tasks retrieved successfully") {
          setRows(tasklist);
        }
      }
    } catch (error) {
      console.error(" Error fetching tasks:", error);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission here
    try {
      let data = {
        taskTitle: taskDetails.taskTitle,
        taskDescription: taskDetails.taskDescription,
        startDate: taskDetails.startDate,
        dueDate: taskDetails.dueDate,
        priority: taskDetails.priority,
        status: taskDetails.status,
        userId: user?.userId,
      };
      let result = await axios.post("/api/add-task", data);
      const { message, status } = result.data;
      if (status == 200) {
        await getTasksList();
        toast.success(message);
      }
    } catch (error) {
      console.error(`Error while adding task in ui ${error}`);
    }

    handleAddTaskModalOpen(false);
  };

  const deleteTask = async (taskid) => {
    // Handle delete task here
    try {
      let result = await axios.delete(`/api/delete-task?taskid=${taskid}`);
      console.log(result, "data");
      const { message, status } = result.data;
      if (status == 200) {
        await getTasksList();
        toast.success(message);
      }
    } catch (error) {
      console.error(`Error while deleting task in ui ${error}`);
    }
  };

  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState([
    {
      field: "Move",
      headerName: "",
      rowDrag: true,
      resizable: false, // No need to resize drag column
      filter: false,
      width: 50,
      maxWidth: 50,
    },
    // {
    //   field: "taskid",
    //   headerName: "ID",
    //   resizable: true,
    //   width: 150,
    //   minWidth: 150,
    // },
    {
      field: "task_title",
      headerName: "Task",
      resizable: true,
      flex: 2,
      minWidth: 300,
    },
    {
      field: "priority",
      headerName: "Priority",
      resizable: true,
      cellRenderer: (params) => {
        return (
          <span>
            {params.value === "high" ? (
              <span className="text-red-600">High</span>
            ) : params.value === "medium" ? (
              <span className="text-yellow-700 font-body">Medium</span>
            ) : (
              <span className="text-blue-800">Low</span>
            )}
          </span>
        );
      },
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      resizable: true,
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      cellRenderer: (params) => {
        return (
          <span>
            {params.value == "todo" ? (
              <span className="text-blue-800 px-3 py-1 rounded-full text-sm bg-gray-200 font-semibold">
                Todo
              </span>
            ) : params.value == "inprogress" ? (
              <span className=" text-yellow-700 px-3 py-1 rounded-full bg-gray-200 text-sm font-semibold">
                In-progress
              </span>
            ) : (
              <span className="text-green-600 px-3 py-1 rounded-full bg-gray-200 text-sm font-semibold">
                Completed
              </span>
            )}
          </span>
        );
      },
    },
    {
      field: "start_date",
      headerName: "Start At",
      resizable: true,
      flex: 1,
      cellRenderer: (params) => {
        return <span>{moment(params.value).format("DD-MM-YYYY")}</span>;
      },
      minWidth: 80,
      maxWidth: 200,
    },
    {
      field: "due_date",
      headerName: "Due At",
      resizable: true,
      cellRenderer: (params) => {
        return <span>{moment(params.value).format("DD-MM-YYYY")}</span>;
      },
      minWidth: 50,
      maxWidth: 200,
    },
    {
      field: "view",
      headerName: "View",
      resizable: true,
      flex: 1,
      minWidth: 100,
      maxWidth: 70,
      filter: false,
      sortable: false,
      pinned: "right",
      cellRenderer: (params) => {
        return (
          <IconButton
            onClick={() => alert(`Viewing Task: ${params.data.task_title}`)}
            size="small"
            title="View"
          >
            <RemoveRedEyeIcon
              fontSize="small"
              className=" text-yellow-700 flex items-center"
            />
          </IconButton>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      resizable: true,
      flex: 1,
      minWidth: 50,
      maxWidth: 100,
      filter: false,
      sortable: false,
      pinned: "right",
      cellRenderer: (params) => {
        return (
          <Menu placement="bottom-start">
            <MenuHandler>
              <IconButton title="Action">
                <MoreVertIcon className=" flex items-center" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className=" text-yellow-700">Edit</MenuItem>
              <MenuItem
                className=" text-red-500"
                onClick={() => {
                  deleteTask(params.data.taskid);
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    },
  ]);
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit(); // Adjust column sizes when grid loads
  };
  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      flex: 1,
      filter: true,
    };
  }, []);

  return (
    <ProtectedRoute>
      {/* Add task modal */}
      {
        <Dialog
          open={openAddTaskModal}
          size="md"
          handler={handleAddTaskModalOpen}
        >
          <DialogHeader>Add New Task</DialogHeader>
          <DialogBody>
            <form className="flex flex-col gap-4">
              <Input
                label="Task Title"
                value={taskDetails.taskTitle}
                onChange={(e) => handleAddTaskInput(e, "taskTitle")}
              />
              <Textarea
                label="Task Description"
                value={taskDetails.taskDescription}
                onChange={(e) => handleAddTaskInput(e, "taskDescription")}
              />
              <div className=" flex gap-2">
                <Input
                  type="date"
                  label="Start Date"
                  value={taskDetails.startDate}
                  onChange={(e) => handleAddTaskInput(e, "startDate")}
                />
                <Input
                  type="date"
                  label="Due Date"
                  value={taskDetails.dueDate}
                  onChange={(e) => handleAddTaskInput(e, "dueDate")}
                />
              </div>
              <Select
                label="Priority"
                value={taskDetails.priority}
                className=""
                onChange={(e) => handleAddTaskInput(e, "priority")}
              >
                <Option value="high" className=" flex w-full">
                  <div className=" flex w-full items-center">
                    <CircleIcon className=" text-sm text-red-600 mr-2" />
                    <span>High</span>
                  </div>
                </Option>
                <Option value="medium" className=" flex">
                  <div className=" flex w-full items-center">
                    <CircleIcon className=" text-sm text-yellow-600 mr-2 flex items-center" />
                    <span>Medium</span>
                  </div>
                </Option>
                <Option value="low" className=" flex">
                  <div className=" flex w-full items-center">
                    <CircleIcon className=" text-sm text-green-600 mr-2 flex items-center" />
                    <span>Low</span>
                  </div>
                </Option>
              </Select>
              <Select
                label="Status"
                value={taskDetails.status}
                onChange={(e) => handleAddTaskInput(e, "status")}
              >
                <Option value="todo" className="flex w-full">
                  <div className="flex w-full items-center">
                    <CircleIcon className="text-sm text-blue-600 mr-2" />
                    <span>To Do</span>
                  </div>
                </Option>
                <Option value="inprogress" className="flex w-full">
                  <div className="flex w-full items-center">
                    <CircleIcon className="text-sm text-orange-600 mr-2" />
                    <span>In Progress</span>
                  </div>
                </Option>
                <Option value="completed" className="flex w-full">
                  <div className="flex w-full items-center">
                    <CircleIcon className="text-sm text-green-600 mr-2" />
                    <span>Completed</span>
                  </div>
                </Option>
              </Select>
            </form>
          </DialogBody>
          <DialogFooter className=" gap-2">
            <Button
              variant="text"
              color="red"
              size="sm"
              onClick={() => handleAddTaskModalOpen(false)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              type="submit"
              size="sm"
              onClick={handleSubmit}
            >
              <span>Add</span>
            </Button>
          </DialogFooter>
        </Dialog>
      }
      <div className="bg-white mx-2 px-4 rounded-lg border border-gray-400">
        <div className="py-5 w-full flex justify-between">
          <span className="text-3xl text-black flex items-center">
            <PlaylistAddCheckIcon
              className="text-gray-700 mr-2"
              fontSize="large"
            />
            To-Do List
          </span>
          <Button variant="gradient" size="sm" onClick={handleAddTaskModalOpen}>
            Add Task +
          </Button>
        </div>
        <hr className="mb-5 mx-9" />
        <div className="mt-5 flex mb-5 w-full">
          {/* To-Do Table */}
          <div
            className="ag-theme-alpine w-full"
            style={{ width: "100%", height: "500px" }}
          >
            <AgGridReact
              defaultColDef={defaultColDef}
              autoSizeStrategy={{
                type: "fitGridWidth",
              }}
              rowDragManaged={true}
              columnDefs={columns}
              rowData={rows}
              onGridReady={onGridReady}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
