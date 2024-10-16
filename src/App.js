import { forwardRef, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  function handleIsOpen() {
    setIsOpen((e) => !e);
  }
  function handleAddfriends(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friend={friends}
          setUser={setSelectedUser}
          user={selectedUser}
        />
        {isOpen && <FormAddFriend onAddFriend={handleAddfriends} />}
        <Button onClick={handleIsOpen}>
          {isOpen ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedUser && (
        <FormSplitBill user={selectedUser} key={selectedUser.id} />
      )}
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FriendsList({ friend, setUser, user }) {
  return (
    <ul className="friends-list">
      {friend.map((friend) => (
        <Friend friend={friend} key={friend.id} setUser={setUser} user={user} />
      ))}
    </ul>
  );
}
function Friend({ friend, setUser, user }) {
  function handleUser(user) {
    setUser((fri) => (fri?.id === user.id ? null : user));
  }

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button onClick={() => handleUser(friend)}>
        {user === friend ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, Setname] = useState("");
  const [image, setImg] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const friend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    console.log(forwardRef);
    onAddFriend(friend);
    setImg("https://i.pravatar.cc/48");
    Setname("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => Setname(e.target.value)}
      />
      <label>Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImg(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ user }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendsExpense = bill ? bill - yourExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !yourExpense) return;
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {user.name}</h2>
      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>💰Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > bill ? yourExpense : Number(e.target.value)
          )
        }
      />
      <label>💰 {user.name} expense </label>
      <input type="text" disabled value={friendsExpense} />
      <label>Who is paying?</label>

      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value="Friend">{user.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
