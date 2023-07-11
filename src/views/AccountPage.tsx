import useStore from "../states/user"
function AccountPage() {

    const username = useStore((state) => state.username);
    const totalAmount = useStore((state) => state.totalAmount);
  return (
    <div>Użytkownik {username}
stan konta {totalAmount}
    </div>
  )
}

export default AccountPage