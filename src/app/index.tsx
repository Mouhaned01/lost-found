import { useState } from 'react';
import { Link } from 'expo-router';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ItemCard from '@/components/ItemCard';
import { useItems } from '@/context/ItemsContext';

export default function Index() {
  const { items } = useItems();
  const [search, setSearch] = useState('');

  const waiting = items.filter((item) => !item.claimed).length;

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.count}>
        {items.length} items reported · {waiting} still waiting for their owner
      </Text>

      <Link href="/add" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>+ Report an item</Text>
        </Pressable>
      </Link>

      <TextInput
        style={styles.searchInput}
        placeholder="Filter items by title..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/item/[id]', params: { id: item.id } }}
            asChild
          >
            <Pressable>
              <ItemCard
                title={item.title}
                place={item.place}
                claimed={item.claimed}
              />
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<Text>Nothing reported yet.</Text>}
      />

      <Text style={styles.footer}>Running on {Platform.OS}</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  count: {
    color: '#6b7280',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  separator: {
    height: 10,
  },
  footer: {
    textAlign: 'center',
    color: '#9ca3af',
    paddingTop: 8,
  },
});