export const fetchData = (action, ctx) => new Promise(action())
                                        .then((response) => ctx.store.dispatch(response))
                                        .catch((e) => console.log(e));