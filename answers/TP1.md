

Question 1
Run `npm install` (or `npm i`). It reads `package.json` and downloads all the missing dependencies.

Question 2
- `_layout.tsx`: Root layout that configures the navigation and wraps all screens.
- `index.tsx`: The main/home screen component shown when opening the app.

 Question 3
- Error: `Text strings must be rendered within a <Text> component.`
- Rule: In React Native, text cannot be placed directly inside a `<View>`; it must always be wrapped in a `<Text>` tag.

Question 4
`keyExtractor` assigns a unique key to each item so React can track list updates efficiently. If two items have the same `id`, React shows a duplicate key warning and UI rendering bugs can happen.

 Question 5
- Before adding: `3 items reported`
- After adding: `4 items reported`
- The two fields are cleared because of `setTitle('');` and `setPlace('');` in `addItem()`.

Question 6
State in React is immutable. `items.push()` modifies the array in place, so React doesn't detect a reference change and won't re-render. `setItems([newItem, ...items])` creates a new array, which triggers a re-render.

 Question 7
- Display:** It shows `0 items reported` and the message `Nothing reported yet.`
- Usefulness:It reassures the user that the app works and the list is just empty, rather than making them think the app is frozen or crashed.

Question 8
In the browser, the layout expands to the full monitor width and inputs have a focus outline, while the emulator keeps a mobile phone ratio and uses mobile inputs.

---

Final Questions

1. Difference between a prop and state:**  
   Props are read-only values passed down by a parent component. State is internal data managed by the component itself that triggers a re-render when modified.

2. Why must text be inside `<Text>`:**  
   React Native doesn't use HTML tags. It uses `<Text>` to convert text directly into native mobile elements (`TextView` on Android, `UILabel` on iOS).

3. What does FlatList do better than writing cards one by one:**  
   `FlatList` only renders the items currently visible on the screen (virtualization). Rendering cards one by one (or with `.map()`) loads everything into memory at once, which slows down the app on long lists.