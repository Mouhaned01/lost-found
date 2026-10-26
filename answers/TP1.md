Question 1.npm i 
Question 2._layout.tsx: Defines the root layout, navigation wrapper, and global screen configurations.
            index.tsx: The main/home screen component displayed when the app opens.
Question 3.Console Error

Text strings must be rendered within a <Text> component.

Source:
C:\Users\epi.ds\Desktop\Mouhaned\lost-found\node_modules\react-native\Libraries\LogBox\Data\LogBoxData.js (235:38)

Call Stack:
....

Question 4:  keyExtractor provides React Native with a unique key for each item in the list, allowing React to track changes, updates, and re-orderings efficiently without re-rendering everything. If two items share the same id, React displays a warning in the console about duplicate keys, and it can cause rendering bugs, incorrect animations, or mismatched component states.

Question 5:
    Before adding the item, the counter shows 3 items reported.
    After adding the item, it shows 4 items reported.
    Once the item is added, both input fields are cleared (reset to empty strings).
    this is caused by lines setTitle(''); and setPlace(''); inside the addIthem function.

Question 6:
    In React, state must be treated as immutable. items.push() mutates the existing array in place without changing its memory reference, so React will not detect the change and will not trigger a re-render.setItems([newItem, ...items]) creates a brand-new array containing the new item followed by the old ones using the spread operator (...), which informs React of the state change and triggers a UI update.

Question 7:
    What the screen shows: The counter displays 0 items reported, and the list displays the message: Nothing reported yet.
    Why it is useful: An empty state reassures the user that the app is working properly and has finished loading, rather than leaving a blank screen that could be mistaken for a bug, a network failure, or an infinite loading state. It gives clear feedback about the system status.
