function AccountPresent(props) {
  return (
    <ul>
      {props.info.map(
        (information) => (
          (id = information.id),
          (cname = information.name),
          (phone = information.phone)
        )
      )}
    </ul>
  );
}
