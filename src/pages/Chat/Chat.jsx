import { isEmpty, map } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";
import { withTranslation } from "react-i18next";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
} from "/src/store/actions";

//redux
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const Chat = (props) => {
  const scrollRef = useRef(null);

  const socket = io("http://localhost:6432", {
    transports: ["websocket", "polling", "flashsocket"],
  });
  //meta title
  document.title = "Chat";

  const dispatch = useDispatch();

  const { chats, messages } = useSelector((state) => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
  }));
  useEffect(() => {
    // Evento para receber mensagens
    socket.on("receiveMessage", (message) => {
      updatemsgs();
    });

    return () => {
      socket.off("receiveMessage"); // Remove o ouvinte do evento ao desmontar o componente
    };
  }, []);
  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Davi Frota",
    isActive: true,
  });
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_Username, setChat_Box_Username] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState(false);
  const [curMessage, setcurMessage] = useState("");

  useEffect(() => {
    dispatch(onGetChats());
    updatemsgs();
    dispatch(onGetMessages(currentRoomId));
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId]);
  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);
  const updatemsgs = () => {
    axios.get("http://localhost:6432/message/6032373073").then((data) => {
      setMsgs(data.data.messages);
    });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };
  const [msgs, setMsgs] = useState([]);
  const userChatOpen = (id, name, status, roomId) => {
    setChat_Box_Username(name);
    setChat_Box_User_Status(status);
    setCurrentRoomId(roomId);
    dispatch(onGetMessages(roomId));
  };
  const addMessage = async () => {
    const message = {
      roomId: "6032373073",
      sender: "Marcelo Victor",
      text: curMessage,
      type: "incoming",
    };
    await axios.post("http://localhost:6432/message", message).then(() => {
      socket.emit("sendMessage", message);
      setcurMessage("");
    });
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  const onKeyPress = (e) => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
    }
  };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="KUBE" breadcrumbItem={props.t("Chat")} />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div>
                    <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
                          onKeyUp={searchUsers}
                          id="search-user"
                          type="text"
                          className="form-control"
                          placeholder={props.t("Search")}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1");
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">
                              {props.t("Chat")}
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            disabled
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2");
                            }}
                          >
                            <span className="d-none d-sm-block">
                              {props.t("Groups")}
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            disabled
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggleTab("3");
                            }}
                          >
                            <span className="d-none d-sm-block">
                              {props.t("Contacts")}
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">
                              {props.t("Recent")}
                            </h5>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              <PerfectScrollbar
                                ref={scrollRef}
                                style={{ height: "410px" }}
                              >
                                {map(chats, (chat) => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      currentRoomId === chat.roomId
                                        ? props.t("Active")
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.name,
                                          chat.status,
                                          chat.roomId
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === props.t("Active")
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                ? "mdi mdi-circle text-warning font-size-10"
                                                : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        {chat.isImg ? (
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {chat.profile}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="align-self-center me-3">
                                            <img
                                              src={chat.image}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        )}

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.name}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {chat.time}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>

                        <TabPane tabId="2">
                          <div>
                            <h5 className="font-size-14 mb-3">
                              {props.t("Recent")}
                            </h5>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              <PerfectScrollbar
                                style={{ height: "410px" }}
                                options={{ scrollbarYPosition: "end" }}
                              >
                                {map(chats, (chat) => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      currentRoomId === chat.roomId
                                        ? props.t("Active")
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.name,
                                          chat.status,
                                          chat.roomId
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === props.t("Active")
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                ? "mdi mdi-circle text-warning font-size-10"
                                                : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        {chat.isImg ? (
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {chat.profile}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="align-self-center me-3">
                                            <img
                                              src={chat.image}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        )}

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.name}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {chat.time}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>

                        <TabPane tabId="3">
                          <div>
                            <h5 className="font-size-14 mb-3">
                              {props.t("Recent")}
                            </h5>
                            <ul
                              className="list-unstyled chat-list"
                              id="recent-list"
                            >
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(chats, (chat) => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      currentRoomId === chat.roomId
                                        ? props.t("Active")
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.name,
                                          chat.status,
                                          chat.roomId
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === props.t("Active")
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                ? "mdi mdi-circle text-warning font-size-10"
                                                : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        {chat.isImg ? (
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {chat.profile}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="align-self-center me-3">
                                            <img
                                              src={chat.image}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        )}

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.name}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {chat.time}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {Chat_Box_Username}
                          </h5>

                          <p className="text-muted mb-0">
                            <i
                              className={
                                Chat_Box_User_Status === props.t("Active")
                                  ? "mdi mdi-circle text-success align-middle me-2"
                                  : Chat_Box_User_Status === "intermediate"
                                  ? "mdi mdi-circle text-warning align-middle me-1"
                                  : "mdi mdi-circle align-middle me-1"
                              }
                            />
                            {Chat_Box_User_Status}
                          </p>
                        </Col>
                        <Col md="8" xs="3">
                          {/* <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                >
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                         <InputGroupAddon addonType="append"> aqui
                                        <Button color="primary" type="submit">
                                          <i className="mdi mdi-magnify" />
                                        </Button>
                                         </InputGroupAddon> aqui
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item  d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-cog" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem href="#">
                                    View Profile
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Clear chat
                                  </DropdownItem>
                                  <DropdownItem href="#">Muted</DropdownItem>
                                  <DropdownItem href="#">Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem href="#">Action</DropdownItem>
                                  <DropdownItem href="#">
                                    Another Action
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Something else
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul> */}
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{
                              height: "470px",
                              backgroundImage:
                                "/src/assets/images/chat/TelegramBackground.png",
                            }}
                            containerRef={(ref) => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">
                                  {props.t("Today")}
                                </span>
                              </div>
                            </li>
                            {msgs &&
                              map(msgs, (message) => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.type === "outgoing" ? "right" : ""
                                  }
                                >
                                  <div className="conversation-list">
                                    {/*<UncontrolledDropdown> Copy, Select, Delete a menssage in chat 
                                      <DropdownToggle
                                        href="#"
                                        tag="a" className="dropdown-toggle"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Forward
                                        </DropdownItem>
                                        <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                          Delete
                                        </DropdownItem>

                                      </DropdownMenu>
                                    </UncontrolledDropdown> */}
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender}
                                      </div>
                                      <p>{message.text}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle me-1"></i>{" "}
                                        {message.time}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={(e) => setcurMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder={props.t("EnterMessage")}
                              />
                              {/* <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">x
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div> */}
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                addMessage(currentRoomId, currentUser.name)
                              }
                              className="btn btn-primary btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                {props.t("Send")}
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
  t: PropTypes.func,
};

export default withTranslation()(Chat);
