# React extended form
- #### Form tag is the key figure here:
    Use it just the way you use regular forms,
    but get nicely serialized data inside
    <span style="color: #0d48b0; font-weight: bold">event.target.data</span>.
    New event has type <span style="color: #ccaa00; font-weight: bold">FormEventExtended</span>.
```tsx
    <Form onSubmit={(event: FormEventExtended) => {
        const data = event.target.data
        ...
    }}>
        <input name={'primary_color'} type={'color'} />
        ...
        <button type={'submit'}>Accept</button>
    </Form>
```
- #### Store array of inputs in ListField:
    Just use <span style="color: #f72645; font-weight: bold">ListField</span> tag and get dynamically resizable (in terms of amount) input.
```tsx
    <Form>
        <ListField name={'list'} type={'number'}/>
        ...
    </Form>
```
######    Serialization result will be regular JavaScript Array.
- #### RGBA color input:
  It can be used just like the regular input with type color.
  However, this one allows you to store alpha as well.
```tsx
<Form>
  <ColorField 
          name={'palette'} 
          defaultValue={'rgba(150, 135, 10, 0.3)'}
  />
  ...
</Form>
```
######    Serialization result will be css color in rgba format.
- #### Typed form field:
  Specify type and get input you need.
  Generalized types system is used so any API can understand it.
```tsx
<Form>
  <TypedField 
          name={'palette'} 
          type={'list[float]'}
  />
  ...
</Form>
```
######    Serialization result will depend on type you specify.
