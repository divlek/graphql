<template>
  <div class="demo">
    <div class="counter">Counter : {{ counter }}</div>
    <div class="user-sections">
      <div class="user-section">
        <h2>
          Add new user
        </h2>
        <div class="input-form">
          <div class="form-field">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" v-model="newUser.name" />
          </div>
          <div class="form-field">
            <label for="age">Age:</label>
            <input type="text" id="age" name="age" v-model="newUser.age" />
          </div>
          <div class="form-field">
            <label for="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              v-model="newUser.email"
            />
          </div>
          <button @click="addUser">Add</button>
        </div>
      </div>

      <div class="user-section">
        <h2>
          Edit user
        </h2>
        <div class="input-form">
          <div class="form-field">
            <label for="name">User id: </label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="editUser.id"
              @blur="getCurrUser(editUser.id)"
            />
          </div>
          <div class="form-field">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" v-model="editUser.name" />
          </div>
          <div class="form-field">
            <label for="age">Age:</label>
            <input type="text" id="age" name="age" v-model="editUser.age" />
          </div>
          <div class="form-field">
            <label for="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              v-model="editUser.email"
            />
          </div>
          <button @click="updateUser">Update</button>
        </div>
      </div>
    </div>

    <h2>Get all users - {{ usersResult }}</h2>
    <table v-if="users && users.length" class="table-user">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.email }}</td>
        <td><a @click="deleteUser(user.id)" class="del-link"> Delete </a></td>
      </tr>
    </table>

    <h2>Get all posts - {{ postsResult }}</h2>
    <table v-if="posts && posts.length">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Body</th>
        <th>Published</th>
        <th>Author</th>
        <th class="th-long">Comments</th>
      </tr>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
        <td>{{ post.published ? `Yes` : `No` }}</td>
        <td>{{ post.author.name }}</td>
        <td>
          <ul>
            <li v-for="comment in post.comments" :key="comment.id">
              {{ comment.text }} - {{ comment.author.name }}
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { GraphQLClientService } from '@/services/graphql-client-service';
/* eslint-disable */
import {
  QueryAllUsers_users,
  QueryAllUsers
} from '@/queries/types/QueryAllUsers';
import {
  QueryAllPosts,
  QueryAllPosts_posts
} from '@/queries/types/QueryAllPosts';
import { User } from '@/queries/users';
import { SubscribeCount } from '@/subscriptions/types/SubscribeCount';
import { SubscribePost_post } from '@/subscriptions/types/SubscribePost';
import { updateUser_updateUser } from '@/queries/types/updateUser';
import { UpdateUserInput } from '@/types/graphql-global-types';

@Component
export default class Demo extends Vue {
  @Inject('graphQLClientService')
  private _graphQLClientService!: GraphQLClientService;
  private _subscriptions: ZenObservable.Subscription[] = [];
  public users: QueryAllUsers_users[] = [];
  public posts: QueryAllPosts_posts[] = [];
  public usersResult = `Fetching..`;
  public postsResult = `Fetching..`;
  public newUser: User = { name: ``, age: 0, email: `` };
  public editUser: User = { id: ``, name: ``, age: 0, email: `` };
  public counter: number = -1;

  public created() {
    this._subscriptions = [];
    this._getAllUsers();
    this._getAllPosts();
    this._subscribeToCounter();
    this._subscribeToUser();
    this._subscribeToPost();
    this._subscribeToComment();
  }

  public destroyed() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public async addUser() {
    try {
      const newUser = await this._graphQLClientService.addUser({
        name: this.newUser.name,
        age: this.newUser.age,
        email: this.newUser.email
      });
    } catch (err) {
      console.error(err);
    }
  }

  public getCurrUser(id: string): void {
    if (!this.editUser || !this.editUser.id || !this.editUser.id.length) {
      return;
    }
    const currUser = this.users.find(user => user.id === id);
    this.editUser.name = currUser?.name ?? ``;
    this.editUser.age = currUser?.age ?? 0;
    this.editUser.email = currUser?.email ?? ``;
  }

  public async updateUser() {
    if (!this.editUser || !this.editUser.id || !this.editUser.id.length) {
      return;
    }
    try {
      const editUserData = {
        name: this.editUser.name,
        age: this.editUser.age,
        email: this.editUser.email
      };

      const newUser = await this._graphQLClientService.updateUser(
        this.editUser.id,
        editUserData
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteUser(id: string) {
    if (!id || !id.length) {
      return;
    }
    try {
      const newUser = await this._graphQLClientService.deleteUser(id);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  private async _getAllUsers() {
    const data: QueryAllUsers = await this._graphQLClientService.queryAllUsers();
    this.usersResult = `Success`;
    this.users = data.users;
  }

  private async _getAllPosts() {
    const data: QueryAllPosts = await this._graphQLClientService.queryAllPost();
    this.postsResult = `Success`;
    this.posts = data.posts;
  }

  private _subscribeToCounter() {
    const sub = this._graphQLClientService
      .subscribeCount()
      .subscribe(result => {
        console.log(`Counter received - ${result?.data?.count}`);
        if (result?.data?.count) {
          this.counter = result?.data?.count;
        }
      });
    this._subscriptions.push(sub);
  }

  private async _subscribeToUser() {
    const sub = this._graphQLClientService.subscribeUser().subscribe(result => {
      console.log('_subscribeToUser: Received new user..');
      const user = result?.data?.user;
      if (user) {
        this.users = [...this.users, user];
      }
    });
    this._subscriptions.push(sub);
  }

  private async _subscribeToPost() {
    const sub = this._graphQLClientService.subscribePost().subscribe(result => {
      console.log('_subscribeToPost: Received new post..');
      const post = result?.data?.post;
      if (post) {
        this.posts = [...this.posts, post];
      }
    });
    this._subscriptions.push(sub);
  }

  private async _subscribeToComment() {
    const sub = this._graphQLClientService
      .subscribeComment()
      .subscribe(result => {
        console.log(
          '_subscribeToComment: Received new comment for post id: 10..'
        );
        const newComment = result?.data?.comment;
        const parentPost = this.posts.find(post => post.id === '10');
        if (parentPost && newComment) {
          parentPost.comments.push({
            text: newComment.text,
            author: newComment.author,
            __typename: `Comment`
          });
        }
      });
    this._subscriptions.push(sub);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.counter {
  display: flex;
  font-size: 20px;
  color: blueviolet;
  justify-content: center;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 10px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.table-user {
  th {
    width: 20%;
  }
}

tr:nth-child(even) {
  background-color: #dddddd;
}

td {
  ul {
    li {
      display: block;
    }
  }
}

.user-sections {
  display: flex;
  flex-direction: column;
  //border: 1px solid gray;

  .user-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: aliceblue;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #42b983;
  }
}

.input-form {
  display: flex;
  align-items: center;
}

.form-field {
  margin: 5px;
  display: flex;
  justify-content: start;
}
label {
  margin-right: 10px;
}
input {
  margin-left: 5px;
}
button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.del-link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
