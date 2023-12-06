import "./UserWidget.scss"

import { Link } from "@/app/AppRouter"
import { User } from "@/store/reducers/user/types"
import ButtonIcon from "@/ui/intrinsic/Button/ButtonIcon"
import Icon from "@/ui/intrinsic/Icon/Icon"

interface UserWidgetProps {
  user: User
  onExit?(): void
}

function UserWidget(props: UserWidgetProps) {
  return (
    <div className="user-widget">
      <div className="user-widget__profile">
        <Icon className="user-widget__settings" name="gear" />
        <div className="user-widget__info">
          <div className="user-widget__name">{props.user.firstName} {props.user.lastName[0].toUpperCase()}.</div>
          <div className="user-widget__email">{props.user.email}</div>
        </div>
        <Link className="ghost" to="/user/profile/settings" />
      </div>
      <div className="user-widget__exit">
        <ButtonIcon color="transparent" name="exit" ariaLabel="Exit" onClick={props.onExit} />
      </div>
    </div>
  )
}

export default UserWidget
