# Firebase API Surface

> all the TypeScript typing you'll need for Firebase

## Overview

Today the Firebase API's (admin and client based) use and export typing but in way that can be confusing to an external consumer and without all of the desired annotations for some modules (aka, the real-time database).

Some of the spotty information that exists today is likely due to the fact that officially the only TypeScript that is "supported" by Google is the Functions API but for those of us who have drunk the TypeScript coolaid we want to dive in now.

Structurally this library exports six high level namespaces:

* app
* auth
* rtdb (_real-time database_)
* firestore
* storage
* messaging

Each section attempts to leverage directly what is already provided by Google but in some cases we will extend/enhance the _typing_ in the following ways:

* **annotations** - in some libraries -- most notably the real-time database -- annotations are not exported so at least in high-use endpoints we'll add annotations from google's documentation
* **generics** - the API for user-defined datatypes is currently typed as "any" with the spec but it is often desireable by consumers to tighten the typing to a user defined type and this can be achieved easily achieved with Typescript
* **missing types** - there are some places where "any" typing is used where there is a known constraint. An example of this is _event types_ in the real-time database. Rather than allowing any "string" property we explictly define the valid event types and constrain it to that.
* **Interface naming** - in TypeScript it is recommended that you export interfaces names as starting with a capital **I** and though I sometimes am tempted to avoid this as I find "Settings" _sexier_ than "ISettings" it comes at the cost of loss of contextual information and in this case I think holds particularly useful value. For that reason all interface names are renamed to with an _I_-prefix.
* **Class to Interface**
  * Google mixes a combination of "types", "interfaces", and "classes" into their typing.
  * In the case of of **Class** definitions though the intent is not entirely clear as no implementation is actually provided so they are in essence just serving as interfaces under a differnt name. For that reason, these classes will be converted to an interfaced (and renamed with the above naming convention)
    > If anyone can shed any design insight into this count me as interested. My guess is that the admin and client API's both implement these classes in slightly different ways and there was a desire to strictly type the private constructor across both API's to be the same? Not sure but that's all I could come up with.
  * There are a few cases where the Class syntax is used to add _static_ properties to the class. There isn't any way to do this with an interface so in these instances the class is left as-is (see "auth" interface for examples).

## Example Usage

A good use case might be if you were creating a library that interacts with Firebase structures/interfaces but is unconcerned whether consuming function is using the Admin API or the client API.

```ts
import { rtdb } from "firebase-api-surface";

class example {
  constructor(protected ref: rtdb.IReference);
  /** set a "value" in the database at a given path */
  public async set<T = any>(path: string, value: T): Promise<void> {
    return this.ref(path)
      .set(value)
      .catch((e: any) =>
        this.handleError(e, "set", `setting value @ "${path}"`)
      );
  }
}
```

## Contributions

**Issues** and **Pull Requests** are both welcome. I have developed what is here so far for my own selfish needs and therefore have given more attention to those areas I am actively working on that areas I am not. Your contributions to help to fill in the gaps or possibly fix any mistakes I may have had (although as a rule I refuse to accept that I make mistakes ... just kidding).

## License

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
