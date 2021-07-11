export function withProvider(Provider) {
  return (Component) => (props) =>
    (
      <Provider>
        <Component {...props} />
      </Provider>
    );
}
