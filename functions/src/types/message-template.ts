
export enum MessageTemplates {
  reg_confirmation = "registration_confirmation",
  member_verified_dev = "member_verification_confirmation_dev",
  member_verified = "member_verification_confirmation"
}

export type MessageParams = {
  phoneNumber: string,
  memberName: string,
  profileLink?: string,
}

export type Parameters = {
  type: "text",
  text: string
}

export type Component = {
  type: "body" | "button",
  sub_type?: "url"
  index ?: number,
  parameters: Array<Parameters>
}

export type Template = {
  name: MessageTemplates,
  language: {
    code: "en_US" | "en"
  },
  components: Array<Component>
}

export type MessagePayload = {
  messaging_product: "whatsapp",
  to: string,
  type: "template" | "text",
  template?: Template,
}