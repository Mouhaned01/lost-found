 Answers TP2

 Question 1
Error: `Property 'claimed' is missing in type '{ id: string; title: string; place: string; }' but required in type 'Item'.`
 TypeScript complains because `claimed` is now mandatory in `Item`, but the objects in `index.tsx` don't have it yet.

Question 2
The counter shows total items and unclaimed items: `3 items reported · 2 still waiting for their owner`.
 The footer displays `Running on android`.
 The word comes from `Platform.OS`, which checks the operating system.

 Question 3
Both screens use the shared `ItemsProvider` context. When `add.tsx` runs `addItem()`, it updates the context state, so `index.tsx` re-renders automatically with the new data.

Question 4
It reads the ID from the URL with `useLocalSearchParams()`, then finds the item in the array using `items.find()`.

 Question 5
 The card opacity drops to 0.6 and shows a green "Claimed" badge. The unclaimed count decreases.
 On iPhone, you'd see the iOS-style green toggle switch instead of the Android switch because `<Switch>` renders the native platform control.

 Question 6
The browser shows the text `"This item does not exist (anymore)."` with a link back to `/`.
 No, the confirmation alert doesn't show up on web because `Alert.alert` only works on mobile/emulator.

 Navigation Map

```text
[ Home: src/app/index.tsx ]
  - uses: items
  |
  +-- (Tap "+ Report an item") ---> [ Add Screen: src/app/add.tsx ]
  |                                  - uses: addItem
  |                                  - router.back() to go back
  |
  +-- (Tap card) ---------------> [ Detail Screen: src/app/item/[id].tsx ]
                                     - uses: items, toggleClaimed, removeItem
                                     - router.back() to go back