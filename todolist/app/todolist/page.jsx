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
  Spinner,
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
import { OverAllContext } from "../../shared/ContextProvider";
import moment from "moment";
import Loader from "@/components/Loader";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";

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
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(OverAllContext);
  const [isLoading, setIsLoading] = useState(false);

  const [taskDetails, setTaskDetails] = useState({
    taskId: "",
    taskTitle: "",
    taskDescription: "",
    startDate: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    getTasksList();
  }, []);

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
      setIsLoading(true);
      let userDetails = JSON.parse(localStorage.getItem("user"));
      if (userDetails.userId) {
        const result = await axios.get(
          `/api/get-tasks?userId=${userDetails.userId}`
        );
        const { status, message } = result.data;
        const { tasklist } = result.data.data;
        if (status == 200 && message == "Tasks retrieved successfully") {
          setRows(tasklist);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(" Error fetching tasks:", error);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission here
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const deleteTask = async (taskid) => {
    // Handle delete task here
    setIsLoading(true);
    try {
      let result = await axios.delete(`/api/delete-task?taskid=${taskid}`);
      const { message, status } = result.data;
      if (status == 200) {
        await getTasksList();
        toast.success(message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(`Error while deleting task in ui ${error}`);
    }
  };

  const openEditTaskModal = async (taskid) => {
    // Handle open edit task modal here
    try {
      setIsEdit(true);
      setIsLoading(true);
      let result = await axios.get(`/api/get-task?taskid=${taskid}`);
      const { message, status, data } = result.data;
      const { taskDetails } = data;
      if (status == 200) {
        let taskDetail = {
          taskid: taskid,
          taskTitle: taskDetails.task_title,
          taskDescription: taskDetails.task_description,
          startDate: moment(taskDetails.start_date).format("YYYY-MM-DD"),
          dueDate: moment(taskDetails.due_date).format("YYYY-MM-DD"),
          priority: taskDetails.priority,
          status: taskDetails.status,
          userId: taskDetails.userId,
        };
        setTaskDetails(taskDetail);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(`Error while getting task in ui ${error}`);
    }
  };

  const editTask = async (taskid) => {
    // Handle edit task here
    try {
      setIsLoading(true);
      let result = await axios.put(`/api/edit-task`, taskDetails);
      const { message, status } = result.data;
      if (status == 200) {
        toast.success(message);
        await getTasksList();
        setIsEdit(false);
      } else {
        toast.error(message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(`Error while editing task in ui ${error}`);
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
      minWidth: 450,
      filter: false,
    },
    {
      field: "priority",
      headerName: "Priority",
      resizable: true,
      filter: false,
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
      maxWidth: 200,
    },
    {
      field: "status",
      headerName: "Status",
      resizable: true,
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      filter: false,
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
      filter: false,
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
      filter: false,
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
      minWidth: 40,
      maxWidth: 80,
      filter: false,
      sortable: false,
      pinned: "right",
      cellRenderer: (params) => {
        return (
          <div className="flex w-full justify-center items-center gap-2 h-full">
            <IconButton size="small">
              <RiEdit2Fill
                className="text-yellow-700 cursor-pointer"
                title="Edit"
                onClick={() => openEditTaskModal(params.data.taskid)}
              />
            </IconButton>
            <IconButton size="small">
              <RiDeleteBin6Fill
                title="Delete"
                className="text-red-500 cursor-pointer"
                onClick={() => deleteTask(params.data.taskid)}
              />
            </IconButton>
          </div>
        );
      },
    },
  ]);
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
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
      {isLoading ? (
        <Loader />
      ) : (
        <Dialog
          open={openAddTaskModal || isEdit}
          size="md"
          handler={() => {
            if (isEdit) {
              setIsEdit(false);
            } else {
              handleAddTaskModalOpen(false);
            }
          }}
        >
          <DialogHeader>{isEdit ? "Edit Task" : "Add Task"}</DialogHeader>
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
              onClick={() => {
                isEdit ? setIsEdit(false) : handleAddTaskModalOpen(false);
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              type="submit"
              size="sm"
              onClick={isEdit ? editTask : handleSubmit}
            >
              <span>{isEdit ? "Edit" : "Add"}</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
      <div className="bg-white mx-2 px-4 rounded-lg border border-gray-400">
        <div className="py-5 w-full sticky top-16 z-50 bg-white px-2 border-b-2 flex justify-between">
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
        <div
          className="mt-5 flex mb-5 w-full"
          style={{ height: "70vh", overflow: "hidden" }} // Fixed height for scrollable rows
        >
          {/* To-Do Table */}
          <div className="ag-theme-alpine w-full" style={{ height: "100%" }}>
            {isLoading ? (
              <Loader />
            ) : (
              <AgGridReact
                defaultColDef={defaultColDef}
                rowDragManaged={true}
                columnDefs={columns}
                rowData={rows}
                onGridReady={onGridReady}
                domLayout="normal"
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
