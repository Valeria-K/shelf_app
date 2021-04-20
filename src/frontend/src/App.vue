<template>
  <v-app>
    <v-alert type="error" dismissible v-show="error">
      Error: {{ error }}
    </v-alert>
    <v-form v-model="valid" class="ma-auto">
      <v-text-field
        v-model="book.title"
        :rules="formRules"
        label="Название"
        required
      ></v-text-field>

      <v-text-field
        v-model="book.author"
        :rules="formRules"
        label="Автор"
        required
      ></v-text-field>

      <v-text-field
        v-model="book.publication_year"
        :rules="yearRules"
        label="Год издания"
        required
      ></v-text-field>
      <v-btn
        class="mr-3"
        depressed
        color="success"
        :disabled="!valid"
        @click="saveForm"
      >
        Save
      </v-btn>
      <v-btn depressed color="primary" @click="clearBook"> Clear </v-btn>
    </v-form>

    <v-simple-table class="ma-auto">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              <h2>Название</h2>
            </th>
            <th class="text-left">
              <h2>Автор</h2>
            </th>
            <th class="text-left">
              <h2>Год издания</h2>
            </th>
            <th class="text-left">
              <h2>Действия</h2>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publication_year }}</td>
            <td>
              <v-btn
                color="primary"
                icon
                @click="
                  $data.book = {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    publication_year: book.publication_year.toString(),
                  }
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="red" icon @click="deleteBook(book)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-app>
</template>

<script>
import { Books } from "./api/books";

export default {
  name: "App",

  data: () => ({
    error: "",
    books: [],
    book: { title: "", author: "", publication_year: "" },
    valid: false,
    formRules: [
      (v) => !!v || "Field is required",
      (v) => v.length <= 255 || "Field must be less than 255 characters",
    ],
    yearRules: [
      (v) => !!v || "Field is required",
      (v) => v.length < 5 || "Year must be less than 5 characters",
      (v) => !isNaN(Number.parseInt(v)) || "Field must be year",
    ],
  }),

  async created() {
    await this.listBooks();
  },

  methods: {
    clearBook() {
      this.book = { title: "", author: "", publication_year: "" };
    },
    async saveForm() {
      if (this.book.id) {
        await this.updateBook(this.book);
      } else {
        await this.createBook(this.book);
      }
      this.clearBook();
    },
    async createBook() {
      let resp = await Books.create(this.book);
      if ('error' in resp) {
        this.error = resp.error;
      } else {
        await this.listBooks();
      }
    },
    async deleteBook(book) {
      let resp = await Books.delete(book);
      if ('error' in resp) {
        this.error = resp.error;
      } else {
        await this.listBooks();
      }
    },
    async updateBook() {
      let resp = await Books.update(this.book);
      if ('error' in resp) {
        this.error = resp.error;
      } else {
        await this.listBooks();
      }
    },
    async listBooks() {
      let resp = await Books.list();
      if ('error' in resp) {
        this.error = resp.error;
      } else {
        this.books = resp
      }
    },
  },
};
</script>
