import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Linking} from 'react-native';
import Communications from 'react-native-communications';

export default function App() {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContactName, setSelectedContactName] = useState('');
  const [selectedContactNumber, setSelectedContactNumber] = useState('');

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        Contacts.getAll()
          .then(contactList => {
            console.log(contactList);
            setContacts(contactList);
            setFilteredContacts(contactList);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const searchContact = text => {
    setSearch(text);
    if (text) {
      const newData = contacts.filter(item =>
        item.displayName.toUpperCase().includes(text.toUpperCase()),
      );
      setFilteredContacts(newData);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const updateModal = (name, number) => {
    setShowModal(true);
    setSelectedContactName(name);
    setSelectedContactNumber(number);
  };

  const sendTextMessage = (phoneNumber) => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000', padding: 15}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
      </View>

      <View style={styles.searchBar}>
        <Image
          source={require('./src/images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search contacts & places"
          placeholderTextColor="grey"
          style={[styles.searchBox, {color: 'white'}]}
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
          onChangeText={text => searchContact(text)}
        />
        <TouchableOpacity>
          <Image
            source={require('./src/images/audio.png')}
            style={styles.voiceSearchIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              updateModal(
                item.displayName.toString(),
                item.phoneNumbers[0].number.toString(),
              )
            }
            style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Image
                source={require('./src/images/user.png')}
                style={styles.contactImage}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.displayName}</Text>
                <Text style={styles.contactNumber}>
                  {item.phoneNumbers[0].number}
                </Text>
              </View>
            </View>

            <View style={styles.contactActions}>
              <TouchableOpacity
                onPress={() => sendTextMessage(item.phoneNumbers[0].number)}>
                <Image
                  source={require('./src/images/message.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => makePhoneCall(item.phoneNumbers[0].number)}>
                <Image
                  source={require('./src/images/call.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Image
                source={require('./src/images/cancel.png')}
                style={styles.modalCloseIcon}
              />
            </TouchableOpacity>

            <Image
              source={require('./src/images/user.png')}
              style={styles.modalImage}
            />

            <Text style={styles.modalName}>{selectedContactName}</Text>
            <Text style={styles.modalNumber}>{selectedContactNumber}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${selectedContactNumber}`)}>
                <Image
                  source={require('./src/images/call.png')}
                  style={styles.modalActionIcon}
                />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Communications.text(selectedContactNumber)}>
                <Image
                  source={require('./src/images/message.png')}
                  style={styles.modalActionIcon}
                />
                <Text style={styles.actionText}>Text</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('./src/images/video.png')}
                  style={styles.modalActionIcon}
                />
                <Text style={styles.actionText}>Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: 'white',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'grey',
  },
  searchBox: {
    flex: 1,
    fontSize: 18,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactDetails: {
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    marginBottom: 3,
  },
  contactNumber: {
    fontSize: 14,
    color: 'grey',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    tintColor: '#C2AB26AA',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#161515AA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseIcon: {
    width: 30,
    height: 30,
    tintColor: 'red',
    alignSelf: 'flex-end',
    marginEnd: 250,
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  modalNumber: {
    fontSize: 22,
    marginBottom: 30,
    color: 'grey',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  modalActionIcon: {
    width: 34,
    height: 34,
    tintColor: '#C2AB26AA',
  },
  actionText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  voiceSearchIcon: {
    width: 25,
    height: 25,
    tintColor: 'grey',
    marginLeft: 30,
  },
});
