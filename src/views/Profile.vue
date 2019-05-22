<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-img class="elevation-5" width="100%" src="./logo.jpg"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs12 v-if="!loading">
            <v-card>
              <v-card-title class="blue white--text">
                <v-menu right height="60px">
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, i) in menu" :key="i">
                      <router-link :to="item.to">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </router-link>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <p class="headline text-xs-center mb-0">Profile</p>
                <v-spacer></v-spacer>
                <v-avatar class="mr-3" size="30px" color="grey lighten-4">
                  <img
                    :src="user!=null?user.user.photoURL||require('../../public/nouser.png'):require('../../public/nouser.png')"
                    alt="avatar"
                  >
                </v-avatar>
              </v-card-title>
              <v-snackbar
                v-model="snackbar"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn dark flat @click="snackbar = false">Close</v-btn>
              </v-snackbar>
              <v-snackbar
                v-model="changePassOK"
                :color="color"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'"
              >
                {{ text2 }}
                <v-btn dark flat @click="changePassOK = false">Close</v-btn>
              </v-snackbar>
              <v-container fluid>
                <v-layout row class="text-center" align-items-center justify-content-center>
                  <v-flex xs12>
                    <v-card flat>
                      <v-card-title primary-title>
                        <div>
                          <v-btn v-if="editing" @click="editName=!editName" small>
                            Change
                            <v-icon small right>create</v-icon>
                          </v-btn>
                          <h3 class="headline mb-0">Name</h3>
                          <div
                            v-if="!editName"
                          >{{user!=null?user.user.displayName||"Name not Set":""}}</div>
                        </div>
                        <form @submit.prevent="validateForm('form-2')" data-vv-scope="form-2">
                          <v-text-field
                            v-if="editName"
                            class="mr-2 ml-2 caption"
                            v-validate="'min:2|required|alpha_spaces'"
                            name="alpha_spaces_field"
                            type="text"
                            v-model="name"
                            label="Edit Your Name"
                            data-vv-as="Name"
                            clearable
                          ></v-text-field>
                          <span
                            v-show="errors.has('form-2.alpha_spaces_field')"
                            class="help red--text caption mr-1 ml-1"
                          >{{ errors.first('form-2.alpha_spaces_field') }}</span>
                          <v-btn small v-if="editName" @click="updateName">Confirm</v-btn>
                        </form>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <div>
                      <div class="end">
                        <v-btn v-if="user!=null" small fab @click="edit">
                          <v-icon v-if="editing" medium color="green">settings</v-icon>
                          <v-icon v-if="!editing" medium>settings</v-icon>
                        </v-btn>
                        <v-btn small fab @click="user!=null?logout():login()">
                          <v-icon v-if="user" medium color="red">power_settings_new</v-icon>
                          <v-icon v-if="!user" medium color="green">power_settings_new</v-icon>
                        </v-btn>
                      </div>
                      <v-card flat class="center">
                        <v-img
                          v-if="user==null"
                          class="maxSize"
                          :src="require('../../public/nouser.png')"
                        ></v-img>
                        <v-img
                          v-else
                          class="maxSize"
                          :src="this.user.user.photoURL||require('../../public/nouser.png')"
                        ></v-img>
                      </v-card>
                      <v-btn v-if="editing" @click="editPhoto=!editPhoto" small>
                        UpLoad
                        <v-icon small right>attach_file</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout
                  v-if="editPhoto&&editing"
                  row
                  class="text-center big"
                  align-items-center
                  justify-content-center
                >
                  <v-flex xs6>
                    <v-text-field
                      label="Select Image"
                      @click="pickFile"
                      v-model="imageName"
                      prepend-icon="attach_file"
                    ></v-text-field>
                    <input
                      type="file"
                      id="blur"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    >
                  </v-flex>
                  <v-flex xs6>
                    <v-btn small @click="upImg">Cancel</v-btn>
                    <v-btn small @click="updateI">Confirm</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row class="text-center big" align-items-center justify-content-center>
                  <v-flex xs2 class="center">
                    <v-icon color="indigo">mail</v-icon>
                  </v-flex>
                  <v-flex xs3 class="center">
                    <strong>E-mail</strong>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex v-if="user!=null" xs7 class="center">
                    <strong>{{userMail}}</strong>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-divider inset></v-divider>
                <v-layout row class="text-center big" align-items-center justify-content-center>
                  <v-flex xs2 class="center">
                    <v-icon color="indigo">lock</v-icon>
                  </v-flex>
                  <v-flex xs3>
                    <strong>Password</strong>
                  </v-flex>
                  <v-flex class="center">
                    <v-btn v-if="resetPass&&editing" @click="change" small>
                      Change
                      <v-icon small right>cached</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-dialog v-model="editingPass" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Change your Password</v-card-title>
                      <form @submit.prevent="validateForm('form-1')" data-vv-scope="form-1">
                        <v-text-field
                          class="mr-2 ml-2"
                          :append-icon="show ? 'visibility' : 'visibility_off'"
                          :type="show ? 'text' : 'password'"
                          name="password"
                          v-model="password"
                          label="New Password"
                          v-validate="'min:6'"
                          data-vv-as="password"
                          clearable
                          ref="password"
                          @click:append="show = !show"
                        ></v-text-field>
                        <span
                          v-show="errors.has('form-1.password')"
                          class="help red--text caption mr-1 ml-1"
                        >{{ errors.first('form-1.password') }}</span>
                        <v-text-field
                          class="mr-2 ml-2"
                          :append-icon="show ? 'visibility' : 'visibility_off'"
                          :type="show1 ? 'text' : 'password'"
                          name="password_confirmation"
                          v-model="password2"
                          label="Repeat the Password"
                          v-validate="'confirmed:password'"
                          data-vv-as="password"
                          clearable
                          @click:append="show1 = !show1"
                        ></v-text-field>
                        <span
                          v-show="errors.has('form-1.password_confirmation')"
                          class="help red--text mr-1 ml-1"
                        >{{ errors.first('form-1.password_confirmation') }}</span>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click="dissmiss">I will do it later</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" flat @click="validate">Proceed to change</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </form>
                    </v-card>
                  </v-dialog>
                </v-layout>
                <v-layout
                  v-if="editing"
                  row
                  class="text-center big"
                  align-items-center
                  justify-content-center
                >
                  <v-flex xs12 class="center" @click="editDelete=!editDelete">
                    <v-spacer></v-spacer>
                    <strong>
                      Delete Acount
                      <v-icon color="red">delete</v-icon>
                    </strong>
                  </v-flex>

                  <v-dialog v-model="editDelete" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Are you sure to delete your account?</v-card-title>
                      <v-card-text>This action will delete all your information and flights.</v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click="dissmissDelete"
                        >I will do it later</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" flat @click="deleteUser">Proceed to delete</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex v-if="loading">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="value"
              color="primary"
            >{{ value }}</v-progress-circular>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="separated100">
        <strong>LandAway made with Love &lt;3</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      menu: [
        { title: "Home", to: "/home " },
        { title: "Flights", to: "/flights/ " },
        { title: "My Flights", to: "/myflights" }
      ],
      editing: false,
      alert: false,
      snackbar: false,
      color: "success",
      mode: "multi-line",
      timeout: 6000,
      editName: false,
      editPhoto: false,
      name: null,
      text: "Logout successfully",
      text2: "Password successfully changed",
      resetPass: false,
      editingPass: false,
      errores: null,
      password: "",
      password2: "",
      show: false,
      show1: false,
      changePassOK: false,
      upLoadImg: null,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      fr: "",
      value: 0,
      editDelete: false
    };
  },
  methods: {
    deleteUser() {
     

      //step1 delete store
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var imagesRef = storageRef.child("images");
      var userCarpet = imagesRef.child(this.user.user.uid);
      var desertRef = userCarpet.child("profileImg");
      desertRef
        .delete()
        .then(succes => {
        })
        .catch(error => {
          console.log(error);
        });

      // step2 delete database

      // TODO

      //step3 delete auth


    this.user.user.delete()
        .then(succes => {
        })
        .catch(error=> {
          console.log(error);
        });
      this.editing=false;
      this.$store.commit("setUser", null);
      this.editDelete = false;
    },
    upImg() {
      this.editPhoto = false;
    },
    updateName() {
      this.errores = null;
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            return;
          }
          var userA = firebase.auth().currentUser;
          userA
            .updateProfile({
              displayName: this.name
            })
            .then(() => {
              this.editName = false;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
          this.errores = error.message;
        });
    },

    dissmiss() {
      this.editingPass = false;
    },
    dissmissDelete() {
      this.editDelete = false;
    },
    validate() {
      this.errores = null;
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            return;
          }
          this.user.user
            .updatePassword(this.password2)
            .then(res => {
              this.editingPass = false;
              this.changePassOK = true;
            })
            .catch(error => {
              console.log(error);
              this.errores = error.message;
            });
        })
        .catch(error => {
          console.log(error);
          this.errores = error.message;
        });
    },
    pickFile() {
      this.$refs.image.click();
    },
    updateI() {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var imagesRef = storageRef.child("images");
      var userImg = imagesRef.child(this.user.user.uid);
      var profileImg = userImg.child("profileImg");
      var uploadImage = profileImg.put(this.imageFile);
      var usageImage = storage.ref(profileImg.fullPath);

      uploadImage.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        snapshot => {
          this.$store.commit("setLoading", true);
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.value = Math.round(progress * 100) / 100;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              this.$store.commit("setLoading", false);
              break;

            case "storage/canceled":
              // User canceled the upload
              this.$store.commit("setLoading", false);
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              this.$store.commit("setLoading", false);
              break;
          }
        },
        () => {
          uploadImage.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$store.commit("setLoading", false);
            usageImage
              .getDownloadURL()
              .then(url => {
                this.user.user
                  .updateProfile({
                    photoURL: downloadURL
                  })
                  .then(() => {
                    this.upImg();
                    this.$forceUpdate();
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      );
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;

        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        this.fr = new FileReader();
        this.fr.readAsDataURL(files[0]);
        this.fr.addEventListener("load", () => {
          this.imageUrl = this.fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          document.getElementById("blur").blur();
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    change() {
      this.editingPass = true;
    },
    checkUid() {
      this.user.user.providerData.forEach(element => {
        if (element.providerId == "password") {
          this.resetPass = true;
        }
      });
    },
    edit() {
      this.checkUid();
      this.editing = !this.editing;
    },
    login() {
      this.$router.replace("/login");
    },
    logout() {
      this.snackbar = true;
      if (this.user) {
        var userId = this.user.user.uid;
        
            var ref = firebase.database().ref("users/" + userId);
            ref.off();
        firebase
          .auth()
          .signOut()
          .then(res => {
            // Sign-out successful.
            
            this.$store.commit("setUser", null);
            this.$store.commit("setDbFlightsNull");
            this.$store.commit("setFlightsNull");
            this.alert = true;
            this.editing = false;
          })
          .catch(error => {
            console.log("logoutfail")
            console.log(error);
          });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userMail() {
      if (this.user) {
        return this.user.user.email;
      }
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  created() {
    
  }
};
</script>

<style scoped>
.separated100 {
  margin-top: 100px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card__title.v-card__title--primary {
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout.text-center.big.row.align-items-center.justify-content-center {
  height: 60px;
}
.maxSize {
  border: 1px black solid;
  max-height: 100px;
  max-width: 100px;
}
.end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.v-alert.rounded.success {
  border-radius: 10px;
  height: 20px;
}
.hiperHeight {
  height: 80px;
}
</style>
