import Entity from "@/core/common/Entity/Entity";

export default abstract class UserProps extends Entity {
  public name: string;
  public photo: string;
  public email: string;
  public password: string;
}
