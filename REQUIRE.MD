# Login

### Login bằng google

- Chỉ chấp nhận mail @gmail.com
  - Thông báo "Vui lòng sử dụng mail @gmail.com"
- Login client side
- JWT trả về dạng `{"email":"abc@gmail.com", permission?:["a","b","c.d","e.*"]}`

### Factory Base

- `base.service.ts` : khởi tạo các crud cơ bản cho entity
- `base.controller.ts` : Khởi tạo các endpoint crud cho entity

### Permission Base

- `permission.entity.ts` : `{id: number, "name": string, "parent": id, description: string}`
- `PermissionGuard` (Tự động lấy permission trong jwt hoặc trong database)
- `RequirePermission([string])` : Tự động map thành dạng `<Controller Path>.<string>`
- `Seed` : Tự động duyệt qua và thêm vào database nếu chưa tồn tại
