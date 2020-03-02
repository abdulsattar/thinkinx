---
title: Elixir
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

[Elixir](https://elixir-lang.org/) is a language that targets the Erlang VM. Its syntax is heavily inspired from Ruby.

The way you think about Elixir is how you think in Erlang, so, this is mostly an Erlang page.

## Processes

In most of the programming languages we have operating system threads which are expensive to spin up. You can't have millions of threads on a typical machine. There are things like Thread Pools to help you manage the threads you spin up.

Erlang/Elixir think differently about this. They give you lightweight threads called processes. These processes are managed by Erlang VM. The most important thing about these processes are they are _isolated_. If one process fails, other processes don't fail and keep running. For communication between processes, there is message passing.

Since the processes are lightweight and isolated, what you can do is spin up one module, say your Database Access module, as a process and another module, say your API module, can send messages to the Database Access module to CRUD data. The Database Access module is like a server here. Now, if the Database Access module fails, it fails in isolation. Your API layer is still functioning (although the messages it sends are being ignored).

## Supervision Trees

Now, there can be another process that gets notified when Database Access process dies. This process, called the Supervisor process, can start another Database Access process to takeover. This supervisor can be supervised by another supervisor which is supervising some other processes as well, resulting in a _Supervision Tree_. What this results in is beautiful:

> Parts of your program can keep failing, but your program as a whole does not fail.
