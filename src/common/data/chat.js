const chats = [
  {
    id: 1,
    roomId: 5514031627,
    status: "Online",
    name: "Marcelo Victor",
    description: "C.R.3.W",
    time: "05 min",
    isImg: true,
    profile: "M",
  },
];

const groups = [
  { id: 1, image: "G", name: "General" },
  { id: 2, image: "R", name: "Reporting" },
  { id: 3, image: "M", name: "Meeting" },
  { id: 4, image: "A", name: "Project A" },
  { id: 5, image: "B", name: "Project B" },
];

const contacts = [
  {
    category: "A",
    child: [
      { id: 1, name: "Adam Miller" },
      { id: 2, name: "Alfonso Fisher" },
    ],
  },
  {
    category: "B",
    child: [{ id: 1, name: "Bonnie Harney" }],
  },
  {
    category: "C",
    child: [
      { id: 1, name: "Charles Brown" },
      { id: 2, name: "Carmella Jones" },
      { id: 3, name: "Carrie Williams" },
    ],
  },
  {
    category: "D",
    child: [{ id: 4, name: "Dolores Minter" }],
  },
];

const messages = [
  {
    id: 1,
    roomId: 1,
    sender: "Neno",
    message: "Oi!",
    time: "10:00",
  },
  {
    id: 2,
    roomId: 1,
    sender: "Henry Wells",
    message: "Bem vindo a Pizza Planet, como podemos lhe ajudar?",
    time: "10:02",
  },
  {
    id: 3,
    roomId: 1,
    sender: "Neno",
    message: "Yeah everything is fine",
    time: "10:06",
  },
  {
    id: 4,
    roomId: 1,
    sender: "Neno",
    message: "& Next meeting tomorrow 10.00AM",
    time: "10:06",
  },
  {
    id: 5,
    roomId: 1,
    sender: "Henry Wells",
    message: "Wow that's great",
    time: "10:07",
  },
  {
    id: 6,
    roomId: 2,
    sender: "Adam Miller",
    message: "Hello!",
    time: "11:00",
  },
  {
    id: 7,
    roomId: 3,
    sender: "Keith Gonzales",
    message: "Hello!",
    time: "11:02",
  },
  {
    id: 8,
    roomId: 4,
    sender: "Jose Vickery",
    message: "Hello!",
    time: "1 hr",
  },
  {
    id: 9,
    roomId: 5,
    sender: "Mitchel Givens",
    message: "Hello!",
    time: "11:05",
  },
  {
    id: 10,
    roomId: 6,
    sender: "Stephen Hadley",
    message: "Hello!",
    time: "1 hr",
  },
  {
    id: 11,
    roomId: 7,
    sender: "Keith Gonzales",
    message: "Hello!",
    time: "1 hr",
  },
];
export { chats, messages, contacts, groups };
